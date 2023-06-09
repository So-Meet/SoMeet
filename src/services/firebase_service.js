import { initializeApp } from 'firebase/app';
import { collection, getDocs, getFirestore, getDoc, doc, deleteDoc, runTransaction, addDoc, query, where } from 'firebase/firestore/lite';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';

class FirebaseService {
    constructor() {
        this.firebaseConfig = {
            apiKey: `${process.env.REACT_APP_FIREBASE_API_KEY}`,
            authDomain: `${process.env.REACT_APP_FIREBASE_AUTH_DOMAIN}`,
            projectId: `${process.env.REACT_APP_FIREBASE_PROJECT_ID}`,
            storageBucket: `${process.env.REACT_APP_FIREBASE_STORAGE_BUCKET}`,
            messagingSenderId: `${process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID}`,
            appId: `${process.env.REACT_APP_FIREBASE_APP_ID}`,
            measurementId: `${process.env.REACT_APP_FIREBASE_MEASUREMENT_ID}`
        };

        this.app = initializeApp(this.firebaseConfig);
        this.db = getFirestore(this.app);
        this.auth = getAuth(this.app);
        this.user = null;

        onAuthStateChanged(this.auth, async (user) => {
            if (user) {
                this.user = user;
            } else {
                this.user = null;
            }
        })
    }

    /**
     * @typedef {Object} user
     * @property {string} accessToken
     * @property {string} displayedName
     * @property {string} email
     * @property {string} uid
     * 
     */

    /**
     * @summary login 기능
     * @param {string} email 
     * @param {string} password
     * @returns {UserImpl} user
     */
    async login(email, password) {
        const user = signInWithEmailAndPassword(this.auth, email, password)
        .then((userCredential) => {
            const user = {
                "accessToken": userCredential.user['accessToken'],
                "displayedName": userCredential.user['displayedName'],
                "email": userCredential.user['email'],
                "uid": userCredential.user['uid']
            };
            return user;
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
            throw new Error("로그인 정보가 잘못됬습니다.");
        });

        return user;
    }

    /**
     * @typedef {Object} User
     * @property {string} email
     * @property {string} name
     */

    /**
     * @summary 유저 정보 GET
     * @returns {User} user
     */
    async getUserInfo() {
        if (!this.user) {
            await new Promise(resolve => {
                const unsubscribe = onAuthStateChanged(this.auth, async (user) => {
                  if (user) {
                    this.user = user; // 사용자 정보를 클래스 인스턴스 속성에 저장
                    unsubscribe(); // 콜백 함수 등록 해제
                    resolve(); // 대기 상태 종료
                  } else {
                    this.user = null; // 사용자 정보를 클래스 인스턴스 속성에 저장
                    unsubscribe(); // 콜백 함수 등록 해제
                    resolve(); // 대기 상태 종료
                  }
                });
              });
        }
        if (this.user) {
            const userDocRef = doc(this.db, "users", this.user.uid);
            const userInfo = await getDoc(userDocRef);

            return userInfo.data();
        } else {
            throw new Error("유저 정보가 존재하지 않습니다.");
        }
    }

    /**
     * @summary logout 기능
     */
    async logout() {
        signOut(this.auth).then(() => {
            
        }).catch((error) => {
            console.log(error);
        });
    }

    /**
     * @typedef {Object} MeetingInfo
     * @property {string} link
     * @property {Date} time
     * @property {string} tag
     * @property {string} place
     * @property {string} title
     * @property {string} type
     * 
     * @typedef {Object} Publisher
     * @property {string} email
     * @property {string} name
     * 
     * @typedef {Object} Meeting
     * @property {string} docId
     * @property {Array<Participant>} Participants
     * @property {MeetingInfo} MeetingInfo
     * @property {Publisher} Publisher
     */

    /**
     * @summary 모든 meeting GET
     * @returns {Array<Meeting>} MeetingList
     */
    async getMeetings() {
        // collection -> doc -> collection 구조라 doc id를 받아온 뒤 다시 collection 에서 fetching 해야함
        const meetingsCol = collection(this.db, 'meetings');
        const meetingSnapshot = await getDocs(meetingsCol);
        const meetingList =await Promise.all(meetingSnapshot.docs.map(async (doc) => {
            let meeting = {}
            meeting['docId'] = doc.id;
            const partipantsSnapshot = await getDocs(collection(this.db, 'meetings', doc.id, 'participants'));
            meeting['participants'] = partipantsSnapshot.docs.map(d => d.data());
            
            // private는 항상 1개라고 가정
            const privateSnapshot = await getDocs(collection(this.db, 'meetings', doc.id, 'private'));
            meeting['meetingInfo'] = privateSnapshot.docs.map(d => d.data())[0];

            // publisher는 항상 1개라고 가정
            const publisherSnapshot = await getDocs(collection(this.db, 'meetings', doc.id, 'publisher'));
            meeting['publisher'] = publisherSnapshot.docs.map(d => d.data())[0];

            return meeting;
        }));

        return meetingList;
    }

    /**
     * @summary meeting DELETE
     * @param {string} docId 
     */
    async deleteMeeting(docId) {
        const user = await this.getUserInfo();
        
        if (sessionStorage.getItem("login flag") === "true") {
            // 게시자가 유저와 같은지 비교
            const publisherSnapshot = await getDocs(collection(this.db, 'meetings', docId, 'publisher'));
            const publisher = publisherSnapshot.docs.map(d => d.data())[0];
            if (publisher.email === user.email) {
                await deleteDoc(doc(this.db, "meetings", docId));
            } else {
                throw new Error("삭제 권한이 없습니다.");
            }
        }
    }

    /**
     * @typedef {Object} MeetingInfo
     * @property {string} Title
     * @property {Date} time
     * @property {string} type
     * @property {string} tag
     * @property {string} place
     * @property {string} content
     * @property {string} link
     */

    /**
     * @summary meeting POST
     * @param {MeetingInfo} meetingInfo
     */
    async createMeeting(meetingInfo) {
        const user = await this.getUserInfo();
        
        if (sessionStorage.getItem("login flag") === "true") {
            try {
                await runTransaction(this.db, async (transaction) => { 
                    // meetings id를 위한 meetingRef 생성
                    const meetingRef = await addDoc(collection(this.db, 'meetings'), {});
                    // 해당 meetings 에 private/meetingInfo 와 publisher 추가
                            transaction.set(doc(collection(this.db, `meetings/${meetingRef.id}/publisher`)), user);
                            transaction.set(doc(this.db, `meetings/${meetingRef.id}/private`, 'meetingInfo'), meetingInfo);
                });
            } catch (e) {
                console.log("Transaction failed: ", e);
            }
        } else {
            console.log("로그인 해주세요");
        }
    }

    /**
     * @summary 미팅 참가 POST
     * @param {string} docId 
     */
    async joinMeeting(docId) {
        const user = await this.getUserInfo();
        
        if (sessionStorage.getItem("login flag") === "true") {
            const participantsDoc = await getDocs(collection(this.db, "meetings", docId, "participants"));
            const participants = participantsDoc.docs.map(doc => doc.data());
            
            // email로 중복 참가 방지
            for (let i = 0; i < participants.length; i++) {
                if (participants[i]['email'] === user['email']) throw new Error("이미 참가한 모임입니다.");
            }
            await addDoc(collection(this.db, `meetings/${docId}/participants`), user);
        } else {
            console.log("로그인 해주세요");
            throw new Error("로그인 정보가 존재하지 않습니다.");
        }
    }

    
    /**
     * @summary 미팅 참가 취소 DELETE
     * @param {string} docId 
     */
    async leftMeeting(docId) {
        const user = await this.getUserInfo();

        if (sessionStorage.getItem("login flag") === "true") {
            const q = query(collection(this.db, `meetings/${docId}/participants`), where("email", "==", user['email']));
            const participantsDoc = await getDocs(q);
            participantsDoc.docs.forEach(async (doc) => {
                if (doc.data().email === user.email)  {
                    await deleteDoc(doc.ref);
                } else {
                    throw new Error("접근 권한이 없습니다.");
                }
            });
        } else {
            console.log("로그인을 해주세요");
            throw new Error("로그인 정보가 존재하지 않습니다.");
        }
    }
}

export default FirebaseService;