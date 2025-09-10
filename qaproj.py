from selenium import webdriver
from selenium.webdriver.common.by import By

# =============== פונקציה למקרה בדיקה #1 ===============
def test_successful_login():
    print("\n--- מתחיל בדיקת התחברות מוצלחת ---")
    driver = webdriver.Chrome()
    driver.get("https://www.saucedemo.com/")
    
    driver.find_element(By.ID, "user-name").send_keys("standard_user")
    driver.find_element(By.ID, "password").send_keys("secret_sauce")
    driver.find_element(By.ID, "login-button").click()
    
    try:
        page_title = driver.find_element(By.CLASS_NAME, "title")
        assert page_title.text == "Products"
        print("סטטוס: הבדיקה עברה בהצלחה! ")
    except Exception:
        print("סטטוס: הבדיקה נכשלה!")
    
    driver.quit()
    print("--- סיום בדיקת התחברות מוצלחת ---")


# =============== פונקציה למקרה בדיקה #2 ===============
def test_locked_out_user():
    print("\n--- מתחיל בדיקת משתמש חסום ---")
    driver = webdriver.Chrome()
    driver.get("https://www.saucedemo.com/")
    
    driver.find_element(By.ID, "user-name").send_keys("locked_out_user")
    driver.find_element(By.ID, "password").send_keys("secret_sauce")
    driver.find_element(By.ID, "login-button").click()
    
    try:
        error_message = driver.find_element(By.CLASS_NAME, "error-message-container")
        assert "Sorry, this user has been locked out" in error_message.text
        print("סטטוס: הבדיקה עברה בהצלחה! ")
    except Exception:
        print("סטטוס: הבדיקה נכשלה! ")
        
    driver.quit()
    print("--- סיום בדיקת משתמש חסום ---")


# = הרצת הבדיקות =
test_successful_login()
test_locked_out_user()