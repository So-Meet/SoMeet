import { initializeApp } from 'firebase/app';
import { collection, getDocs, getFirestore, getDoc, deleteDoc, runTransaction, doc, addDoc } from 'firebase/firestore/lite';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';

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
            // TODO: 여기는 어떻게 처리해야할지 고민...
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
        });

        return user;
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
     * @typedef {Object} user
     * @property {string} accessToken
     * @property {string} displayedName
     * @property {string} email
     * @property {string} uid
     * 
     */

    /**
     * @typedef {Object} MeetingInfo
     * @property {string} link
     * @property {string} time
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
        await deleteDoc(doc(this.db, "meetings", docId));
    }

    /**
     * @typedef {Object} MeetingInfo
     * @property {string} Title
     * @property {string} time
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
        onAuthStateChanged(this.auth, async (user) => {
            if (user) {
                const userDocRef = doc(this.db, "users", user.uid);
                const userInfo = await getDoc(userDocRef);
                try {
                    await runTransaction(this.db, async (transaction) => {
                        // meetings id를 위한 meetingRef 생성
                        const meetingRef = await addDoc(collection(this.db, 'meetings'), {});
                        // 해당 meetings 에 private/meetingInfo 와 publisher 추가
                        transaction.set(doc(collection(this.db, `meetings/${meetingRef.id}/publisher`)), userInfo.data());
                        transaction.set(doc(this.db, `meetings/${meetingRef.id}/private`, 'meetingInfo'), meetingInfo);
                    });
                } catch (e) {
                    console.log("Transaction failed: ", e);
                }
            } else {
                // TODO: 로그인 안했을 때 처리 추가
                console.log("로그인 해주세요");
            }
        });
    }
}

export default FirebaseService;