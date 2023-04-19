import { initializeApp } from 'firebase/app';
import { collection, getDocs, getFirestore } from 'firebase/firestore/lite';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

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
            // 여기는 어떻게 처리해야할지 고민...
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
}

export default FirebaseService;