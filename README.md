# Cocktail-App

This is a coctail recipe cross platform application building with Ionic5 with Angular, and Cordova SQLite database. It can be run in Android emulator and IOS simulator with Ionic Capacitor. The user can type any key words to search corresbonding cocktail recipe from CocktailAPi, and add to the list to store in local SQLite database. The user can also create new cocktail recipe and save to the list. All recipes in the list can be edited by the user.

Best way to run the app: run with capacitor in an emulartor or ios simulator.

To run the app in browser:

```
npm install
```
```
npm i -g cordova
```
```
ionic cordova build browser
```
```
ionic serve --cordova --plarform browser
```

Notice:

There are some cordova errors showing in the console when you test the app on browser which do not affect running the app, thoese are due to the Splash Screen component is available only as Ionic Native component. If you want to avoid those errors, please do following:
```
$ cp config.xml platforms/browser/platform_www
```
In the copied config.xml, find ```<preference name="SplashScreen" value="screen" />```

change the value for an image name to a real image file: ```<preference name="SplashScreen" value="logo.png" />```

put that file in the same directory (/platforms/browser/platform_www) 

For more details, please refer to: https://stackoverflow.com/questions/54676085/browser-could-not-xhr-config-xml-not-found
