# Trip Management Systemמערכת לניהול טיול שנתי, שנבנתה כחלק מתרגיל הבית לתוכנית הדסים.

המערכת מאפשרת ניהול של מורות, תלמידות וכיתות, כולל התחברות לפי סוג משתמש, צפייה ברשימות, הוספת תלמידות ומורות, והצגת מיקומים על גבי מפה שמתעדכנת לפי מידע שמתקבל מחיישנים. לכל כיתה משויכת מורה אחת ומספר תלמידות.

<details dir="rtl">
  <summary>תוכן עניינים</summary>

  <ol>
    <li><a href="#about">על הפרויקט</a></li>
    <li><a href="#tech">טכנולוגיות שבהן השתמשתי</a></li>
    <li><a href="#run">איך מריצים את המערכת</a></li>
    <li><a href="#usage">אופן השימוש</a></li>
    <li><a href="#users">סוגי משתמשים במערכת</a></li>
    <li><a href="#structure">מבנה הפרויקט</a></li>
    <li><a href="#summary">לסיכום</a></li>
  </ol>
</details>


<a id="about"></a>
# על הפרויקט
המערכת Trip Management System היא מערכת שנועדה לנהל טיולים בית ספריים בצורה נוחה ומסודרת.  
המטרה הייתה ליצור מערכת שמאפשרת לצוות החינוכי לראות את מיקומי המשתתפים בזמן אמת, לנהל תלמידים ומורים, ולהציג מידע בצורה ברורה ונוחה דרך ממשק אינטואיטיבי.

במהלך העבודה על הפרויקט שילבתי צד שרת ב־Spring Boot, צד לקוח ב־React, מסד נתונים PostgreSQL וממשק מפות של Google Maps.

המערכת כוללת שלושה סוגי משתמשים:

- מנהל מערכת  
- מורה  
- תלמיד  

לכל אחד מהם מוצג מסך שונה בהתאם להרשאות שלו.

<a id="tech"></a>
# טכנולוגיות שבהן השתמשתי

הפרויקט בנוי ממספר חלקים שעובדים יחד:

### צד שרת (Backend)

- Java 21  
- Spring Boot  
- Spring Data JPA  
- Maven  
- BCrypt להצפנת סיסמאות  

### צד לקוח (Frontend)

- React  
- Vite  
- Bootstrap  
- Axios  

### מסד נתונים

- PostgreSQL  

### שירותים חיצוניים

- Docker (להרצת PostgreSQL)
- Google Maps API

<h1 id="run">איך מריצים את המערכת</h1>

כדי להפעיל את הפרויקט יש להרים גם את צד השרת, גם את צד הלקוח וגם את מסד הנתונים.

## שלב ראשון – התקנת תוכנות נדרשות

יש לוודא שמותקנים:

- Java JDK 21  
- Node.js  
- Docker Desktop  
- IntelliJ (מומלץ)
-  VS Code (מומלץ)


### שלב שני – הורדת הפרויקט

יש לפתוח את VS Code (או כל עורך קוד אחר) ולבצע clone לפרויקט מה־GitHub:

```bash
git clone https://github.com/OfraLevy/Trip-management-system.git
```
## שלב שלישי – הרמת מסד הנתונים

לפני שמריצים את המסד, חשוב לוודא ש־Docker Desktop פתוח ורץ.

לאחר מכן, מתוך תיקיית ה־backend, יש להריץ:
```bash
docker-compose up
```
פעולה זו תרים קונטיינר של PostgreSQL עם ההגדרות שהמערכת משתמשת בהן.

## שלב רביעי – הרצת צד השרת

יש לפתוח את תיקיית ה־backend ב־IntelliJ, להריץ את קובץ ה־main של Spring Boot (הקובץ שמכיל את הפונקציה main), ולחכות שהשרת יעלה.

שימי לב:
אם מופיעה הודעה שקשורה ל־Lombok (למשל בקשה לאפשר Annotation Processing), יש לאשר אותה ואז להריץ שוב את הפרויקט.

השרת ירוץ בכתובת:

```bash
http://localhost:8080
```

## שלב חמישי – הרצת צד הלקוח
בתיקיית ה־frontend יש להריץ:
```bash
npm install
npm run dev
```

המערכת תעלה בכתובת:
```bash
http://localhost:3000
```
<h1 id="usage">אופן השימוש</h1>
כאשר נכנסים למערכת מופיע מסך התחברות והרשמה.

המערכת מזהה לפי תעודת הזהות האם המשתמש הוא תלמיד או מורה (בהתאם לנתונים שכבר קיימים במערכת).

משתמש חדש יכול להירשם באמצעות תעודת זהות, לבחור האם הוא תלמיד או מורה, ולאחר מכן להתחבר עם המשתמש שיצר.

בנוסף קיים משתמש מנהל מערכת שנוצר אוטומטית בעת הפעלת השרת:

- שם משתמש: `admin`
- סיסמה: `ofra`

לאחר ההתחברות המערכת מעבירה את המשתמש למסך המתאים בהתאם להרשאות שלו.

<table align="center">
  <tr>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/27c0086e-3b58-432e-a018-69c0a73081f5" alt="Before Image">
    </td>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/dd99e840-877b-4c9b-b858-cac911dc41f8" alt="After Image">
    </td>
  </tr>
</table>


<h1 id="users">סוגי משתמשים במערכת</h1>

## מנהל מערכת
למנהל יש גישה למסכי ניהול, והוא יכול:

- לצפות ברשימת מורים
- לצפות ברשימת תלמידים
- להוסיף מורה חדש
- להוסיף תלמיד חדש
  
<img width="1585" height="701" alt="image" src="https://github.com/user-attachments/assets/9e3eab91-157b-44c3-bee4-e9c2e624d42b" />

## מורה
כאשר מורה מתחבר, הוא רואה:

- את תלמידי הכיתה שלו
- רשימת כלל התלמידים
- רשימת כלל המורים
- מפה המציגה מיקומים בזמן אמת

בנוסף ניתן ללחוץ על תלמיד או מורה ולקבל פרטים נוספים

<table align="center">
  <tr>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/ca5210a8-8b16-47fe-b299-9efc2e55e3c2" alt="Before Image">
    </td>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/bcc471ca-b5a8-4450-8f02-d48143a5eda4"  alt="After Image">
    </td>
  </tr>
</table>


## תלמיד
כאשר תלמיד מתחבר, הוא רואה מפה הכוללת:

- את המיקום שלו
- את מיקום המורה
- מידע שמתעדכן בזמן אמת
<img width="1674" height="819" alt="image" src="https://github.com/user-attachments/assets/badb615c-4a16-4182-8cff-f3a4b0afdbe1" />


# מעקב מיקומים בזמן אמת
במערכת קיים סימולטור מובנה שמעדכן מיקומים כל מספר שניות.

הסימולטור מדמה תזוזה של תלמידים ומורים ושולח את הנתונים לשרת, כך שניתן לראות על המפה שינויי מיקום בזמן אמת.

מקרא:


<table align="center">
  <tr>
    <th align="center">הסבר</th>
    <th align="center">סימן</th>
  </tr>
  <tr>
    <td align="center">
תלמיד שנמצא בטווח מהמורה יסומן בירוק
    </td>
    <td align="center">
      <img width="25" height="25" alt="green" src="https://github.com/user-attachments/assets/7d13d3d8-b24c-4c9f-aa6f-2ff65bb92ac7" />
    </td>
  </tr>
  <tr>
    <td align="center">
      תלמיד שמתרחק מעבר לטווח יסומן באדום
    </td>
    <td align="center">
      <img width="25" height="25" src="https://github.com/user-attachments/assets/186830b8-4368-4d09-b436-5e444103c341" />
    </td>
  </tr>
  <tr>
    <td align="center">
  מורה יסומן בכחול
    </td>
    <td align="center">
      <img width="25" height="25" alt="blue" src="https://github.com/user-attachments/assets/8e8e37a3-0cbb-4d32-b6b1-765ec3c7ec31" />
    </td>
  </tr>
  <tr>
    <td align="center">
 יוזר נוכחי יסומן בסמן דיפולטיב
    </td>
    <td align="center">
     <img width="25" height="25" alt="normal" src="https://github.com/user-attachments/assets/b3aadbfa-ccc3-4e35-bc09-c726dad13fdc" />
    </td>
  </tr>
  <tr>
    <td align="center">
  יש רדיוס סביב המורה (במסך התלמיד סביב המורה של התלמיד)
    </td>
    <td align="center">
      <img width="25" height="25" alt="dry-clean" src="https://github.com/user-attachments/assets/864637fc-d2c1-4709-b884-049d5d5741c6" />
    </td>
  </tr>
</table>

כך ניתן לקבל תמונת מצב מהירה במהלך הטיול.

<img width="311" height="298" alt="image" src="https://github.com/user-attachments/assets/39e633a9-3981-40b1-ade6-bfeb6b2e15bf" />



<h1 id="structure">מבנה הפרויקט</h1>
המערכת מחולקת לשתי שכבות עיקריות:

### Backend
- Controllers
- Services
- Entities
- DTO
- Repositories
### Frontend
- Components
- Services
- Pages לפי סוג משתמש
- Location Generator המדמה תנועה ועדכון מיקומים בזמן אמת
  
<h1 id="summary">לסיכום</h1>

זהו פרויקט אישי שנבנה כחלק ממבחן בית, ובמהלכו התבקשתי לפתח מערכת מלאה מקצה לקצה.

בפרויקט שילבתי עבודה עם צד שרת, צד לקוח, מסד נתונים טבלאי, הרשאות משתמשים, עבודה עם מפות ועדכון נתונים בזמן אמת.

העבודה על הפרויקט אפשרה לי ליישם בצורה מעשית נושאים שלמדתי במהלך התואר ונושאים חדשים, ולבנות מערכת פונקציונלית המדמה תרחיש אמיתי של ניהול טיול בית ספריים.
