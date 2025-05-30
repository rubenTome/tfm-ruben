import sys, os, pathlib
from pathlib import Path
import aiofiles
import zipfile
import requests
from fastapi import FastAPI, UploadFile
from fastapi.middleware.cors import CORSMiddleware
sys.path.append(os.path.abspath(str(pathlib.Path(__file__).parent.resolve()) + "/../e2efs"))
from script_alpha import run_experiment
import shutil

app = FastAPI()

firebaseConfig = {
  "apiKey": "AIzaSyCFouSPkgLs2Ic0lczTdc1O1nBjTv6A6BA",
  "authDomain": "tfm-bd-3e179.firebaseapp.com",
  "databaseURL": "https://tfm-bd-3e179-default-rtdb.europe-west1.firebasedatabase.app",
  "projectId": "tfm-bd-3e179",
  "storageBucket": "tfm-bd-3e179.firebasestorage.app",
  "messagingSenderId": "1018395587672",
  "appId": "1:1018395587672:web:da2d8e5437d2180b0e062d",
  "measurementId": "G-HF4F5MQ5X8"
};

userInfo = {}

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

registrarse_url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + firebaseConfig["apiKey"]
login_url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" + firebaseConfig["apiKey"]
bd_url = "https://tfm-bd-3e179-default-rtdb.europe-west1.firebasedatabase.app"

@app.post("/registrarse")
def resgistrarse(userData: dict):
    payload = {
    "email": userData["email"],
    "password": userData["password"],
    "returnSecureToken": True
    }
    res = requests.post(registrarse_url, json=payload)
    if res.status_code == 200:
        userInfo["idToken"] = res.json()["idToken"]#es el token de indentificacion de la sesion
        userInfo["localId"] = res.json()["localId"]#es el uid del usuario
        userInfo["email"] = userData["email"]
        return res.json()
    else:
        return "Error " + str(res.status_code) + ": " + str(res.text)

@app.put("/login")
def login(userData: dict):
    payload = {
    "email": userData["email"],
    "password": userData["password"],
    "returnSecureToken": True
    }
    res = requests.post(login_url, json=payload)
    if res.status_code == 200:
        userInfo["idToken"] = res.json()["idToken"]
        userInfo["localId"] = res.json()["localId"]
        userInfo["email"] = userData["email"]
        return res.json()
    else:
        return "Error " + str(res.status_code) + ": " + str(res.text)


@app.get("/logout/")
def logout():
    userInfo.clear()
    return "user logged out"
    
@app.get("/isLoggedIn")
def authenticated():
    if (userInfo  == {} or "idToken" not in userInfo or "localId" not in userInfo):
        return False
    res = requests.get(f"{bd_url}/users/{userInfo['localId']}.json?auth={userInfo['idToken']}")
    if res.status_code == 200 and res.json() != {}:
        return True
    else:
        return False

@app.get("/experiment/")
def expermient(dataset: str, nFeat: str, prec: str, kFolds: str, reps: str, alpha: str, wait: str, implementation: str, codecarbon: str):
    run_experiment(dataset, nFeat, prec, kFolds, reps, alpha, wait, implementation, codecarbon, bd_url, userInfo)
    return {"success": [dataset, nFeat, prec, kFolds, reps, alpha, wait, implementation, codecarbon]}

@app.get("/detalle/")
async def detalle(id: str):
    url = f"{bd_url}/users/{userInfo['localId']}/history/{id}.json?auth={userInfo['idToken']}"
    res = requests.get(url)
    if res.status_code == 200:
        return res.json()
    else:
        return "Error " + str(res.status_code) + ": " + str(res.text)

@app.get("/historial/")
async def history():
    url = f"{bd_url}/users/{userInfo['localId']}/history.json?auth={userInfo['idToken']}"
    res = requests.get(url)
    if res.status_code == 200:
        resJson = res.json()
        resKeys = list(resJson.keys())
        historyList = []
        for i in range(len(resKeys)):
            historyList.append(resJson[resKeys[i]])
        return historyList
    else:
        return "Error " + str(res.status_code) + ": " + str(res.text)

@app.get("/datasets_list/")
async def get_datasets_list():
    datasetsPath = str(pathlib.Path(__file__).parent.resolve()) + "/../../tfm-backend/e2efs/datasets"
    datasets = [" "]
    datasets += os.listdir(Path(datasetsPath))

    if "localId" in userInfo:
        userDatasetsPath = str(pathlib.Path(__file__).parent.resolve()) + "/../../tfm-backend/e2efs/datasets_" + userInfo["localId"]
        if os.path.exists(userDatasetsPath):
            datasets += os.listdir(Path(userDatasetsPath))

    return datasets

@app.get("/exec_info")
async def get_exec_info():
    url = f"{bd_url}/users/{userInfo['localId']}/exec_info.json?auth={userInfo['idToken']}"
    res = requests.get(url)
    if res.status_code == 200:
        return res.json()
    else:
        return "Error " + str(res.status_code) + ": " + str(res.text)


@app.put("/dataset/")
async def dataset(file: UploadFile):
    #hacer esto con el token de sesion o con el uid del usuario
    out_file_folder = str(pathlib.Path(__file__).parent.resolve()) + str(Path("/../../tfm-backend/e2efs/datasets_" + userInfo["localId"]))
    os.mkdir(out_file_folder)
    out_file_path = str(Path(out_file_folder + "/" +  file.filename))
    async with aiofiles.open(out_file_path, 'wb') as out_file:
        content = await file.read()
        await out_file.write(content)
    
    with zipfile.ZipFile(out_file_path, 'r') as zip_ref:
        zip_ref.extractall(out_file_path.replace(".zip", ""))
    
    os.remove(out_file_path)

    return {"success": file}

@app.delete("/delete_dataset/")
async def delete_dataset(filename: str):
    if "localId" not in userInfo:
        return "Error: user not logged in"
    filePath = str(pathlib.Path(__file__).parent.resolve()) + str(Path("/../../tfm-backend/e2efs/datasets_" + userInfo["localId"] + "/" + filename))
    if os.path.exists(filePath):
        shutil.rmtree(filePath)
        return "file deleted"
    else:
        return "Error: file not found"
    
@app.get("/getEmail/")
async def get_email():
    if "localId" not in userInfo:
        return "Error: user not logged in"
    else:
        return userInfo["email"]