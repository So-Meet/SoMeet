import argparse
import firebase_admin
import pandas as pd
from firebase_admin import credentials, auth, firestore


cred = credentials.Certificate("./serviceAccountKey.json")
firebase_admin.initialize_app(cred)
firebase_db = firestore.client()
userInfo = "user_info.csv"


def readUserinfoEmailNotNull(filter_name = None, filter_email = None):
    df = pd.read_csv(userInfo)
    df = df[df['email'].notnull()]
    cols = ['name', 'email']

    return df[cols]

        


def signinUser(email, password, name):
    try:
        userRecord = auth.create_user(email = email, password = password)
        firebase_db.collection('users').document(userRecord.uid).set({'email' : email, 'name' : name})
        print(f"{name} : {email} done!")
    except Exception as e:
        print(f"{name} : {email} failed : ", e)
    
    




if __name__ == "__main__":
    # parser = argparse.ArgumentParser("upload user to firebase.")
    # parser.add_argument("--all", help="upload all")
    # parser.add_argument("")
    
    
    
    df = readUserinfoEmailNotNull()
    for i in df.index:
        email = df.loc[i, 'email']
        password = email
        name = df.loc[i, 'name']
        print(email, name)
        signinUser(email, password, name)
        