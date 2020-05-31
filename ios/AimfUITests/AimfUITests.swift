//
//  AimfUITests.swift
//  AimfUITests
//
//  Created by Abderrazzak BENABDALLAH on 29/05/2020.
//  Copyright © 2020 Facebook. All rights reserved.
//

import XCTest

class AimfUITests: XCTestCase {

    override func setUpWithError() throws {
        // Put setup code here. This method is called before the invocation of each test method in the class.

        // In UI tests it is usually best to stop immediately when a failure occurs.
        continueAfterFailure = false

        // In UI tests it’s important to set the initial state - such as interface orientation - required for your tests before they run. The setUp method is a good place to do this.
    }

    override func tearDownWithError() throws {
        // Put teardown code here. This method is called after the invocation of each test method in the class.
    }

    func testExample() throws {
        // UI tests must launch the application that they test.
        let app = XCUIApplication()
      
      let app = XCUIApplication()
      let element = app.children(matching: .window).element(boundBy: 0).children(matching: .other).element.children(matching: .other).element.children(matching: .other).element
      let adresseEmailMotDePasseConnexionVousNAvezPasEncoreUnCompteElement = element.children(matching: .other)["Adresse email Mot de passe Connexion Vous n'`avez pas encore un compte?"].children(matching: .other)["Adresse email Mot de passe Connexion Vous n'`avez pas encore un compte?"].children(matching: .other)["Adresse email Mot de passe Connexion Vous n'`avez pas encore un compte?"].children(matching: .other)["Adresse email Mot de passe Connexion Vous n'`avez pas encore un compte?"]
      adresseEmailMotDePasseConnexionVousNAvezPasEncoreUnCompteElement.tap()
      
      let adresseEmailMotDePasseConnexionVousNAvezPasEncoreUnCompteElement2 = adresseEmailMotDePasseConnexionVousNAvezPasEncoreUnCompteElement.children(matching: .other)["Adresse email Mot de passe Connexion Vous n'`avez pas encore un compte?"]
      adresseEmailMotDePasseConnexionVousNAvezPasEncoreUnCompteElement2.children(matching: .image).element.tap()
      adresseEmailMotDePasseConnexionVousNAvezPasEncoreUnCompteElement2.tap()
      
      let reloadRStaticText = app/*@START_MENU_TOKEN@*/.staticTexts["Reload (⌘R)"]/*[[".buttons[\"Reload (⌘R)\"].staticTexts[\"Reload (⌘R)\"]",".buttons[\"redbox-reload\"].staticTexts[\"Reload (⌘R)\"]",".staticTexts[\"Reload (⌘R)\"]"],[[[-1,2],[-1,1],[-1,0]]],[0]]@END_MENU_TOKEN@*/
      reloadRStaticText.tap()
      reloadRStaticText.tap()
      element.tap()
      element.children(matching: .other)["Adresse email Mot de passe Connexion Vous n'`avez pas encore un compte? Dismiss All Remote debugger is in a background tab which may cause apps to perform slowly. Fix this by foregrounding the tab (or opening it in a separate window). Vertical scroll bar, 2 pages Horizontal scroll bar, 1 page"].children(matching: .other)["Adresse email Mot de passe Connexion Vous n'`avez pas encore un compte? Dismiss All Remote debugger is in a background tab which may cause apps to perform slowly. Fix this by foregrounding the tab (or opening it in a separate window). Vertical scroll bar, 2 pages Horizontal scroll bar, 1 page"].children(matching: .other)["Adresse email Mot de passe Connexion Vous n'`avez pas encore un compte?"].children(matching: .other)["Adresse email Mot de passe Connexion Vous n'`avez pas encore un compte?"].tap()
      adresseEmailMotDePasseConnexionVousNAvezPasEncoreUnCompteElement.tap()
        app.launch()

        // Use recording to get started writing UI tests.
        // Use XCTAssert and related functions to verify your tests produce the correct results.
    }

    func testLaunchPerformance() throws {
        if #available(macOS 10.15, iOS 13.0, tvOS 13.0, *) {
            // This measures how long it takes to launch your application.
            measure(metrics: [XCTOSSignpostMetric.applicationLaunch]) {
                XCUIApplication().launch()
            }
        }
    }
}
