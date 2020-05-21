# Aimf app

## 1.Requirements

* Git
* Node or Yarn

## 2.Installation

* Install [npm](https://www.npmjs.com/get-npm)
* Install [Yarn](https://yarnpkg.com/fr/docs/install#debian-stable)
* Install [Git](https://git-scm.com/book/fr/v1/D%C3%A9marrage-rapide-Installation-de-Git)


- Get the project : 
```
git clone git@github.com:ilyeSudo/AIMFAPP.git
``` 

- Get and install dependencies :
``` 
cd AIMFAPP/
yarn install
```
- Install react-native-cli globally: 
``` 
yarn global add react-native-cli
```
- Create a new .env file from .env.example and put your ip private address with 8080 port in API_BASE_URL variable (ex : http://192.168.0.23:8080) 
- Start the react server
```
react-native start
```
- Build the aimf app (Before do this, you must be sure you have an android emulator configured or a device connected to your machine):
```
react-native run-android
```
Note : after switch between branch, it's recommended to refresh env with this command :
```
sudo npm run refresh:env
```
