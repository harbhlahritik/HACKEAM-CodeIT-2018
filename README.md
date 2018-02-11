# HACKEAM-2018
## MedRep

![alt text](https://github.com/harbhlahritik/HACKEAM-2018/raw/master/src/common/images/logogithub.png "Logo")

Solution of team CodeIT for the HACKEAM-2018 event held on 10-02-18
-------------------------------------------------------------------

A unique aadhaar based medical repository making it easier for people to keep an extensive record of their medical reports from Birth.
When we went for the Kakrola trek, we discovered that there was a lack of a centralised system that could keep track of the users records and also maintain a high level of security with the users data. Due to the aforementioned reason we designed our web platform MedRep which serves as a centralised repository for all the users data and offers some unparalled features due to its unique integration with the UIDAI aadhaar card. The platform uses Node.js express along with MongoDB as its DataBase.

TECHNOLOGY USED
--------
* **Html ,css** , javascript (backend we used embedded js - ejs)
* **Bootstrap 3** – Makes our website responsive
* **Node.js** – Backbone of our Backend applications. Using Express.
* **Bcrypt (npm package)** – for Authenticating new users.
* **Express-sessions (npm package)** – for handling the sessions of active users and labs.
* **MongoDB** – We went forward to use a noSQL database like MongoDB. Our project has 4 schemas – one which keeps track of User data, one for the Labs , a separate schema for handling the uploaded files and lastly the express-middleware sessions schema.
* **Multer (npm package)** – Creates a local repository where files are saved , however it poses a restriction of only 16MB data for BSON files. Therefore, the platform would later change to GridFS system during the time of hosting.
* **Aadhaar API** – Provides our application with all the data for its successful function. It provides the Name, Mobile and email for a particular Aadhaar possessing individual.(Current implementation not feasible as API key is only being provided to registered Entreprises).

![alt text](https://github.com/harbhlahritik/HACKEAM-2018/raw/master/src/common/images/8049.png "FlowChart")

WHY AADHAAR ?
--------
* Aadhaar is already linked to the users mobile data and email id, this allows us to use their api for OTP verification for a user
*	All category of people being in any part of the social structure have an aadhaar card issued in their name. This prepares us for a future where aadhaar will be the sole proof of identity for an individual.
*	Medical insurance and other data can also be integrated into the same secure platform at a later stage
Advantages offered to labs –
*	No need to physically provide medical reports to the users. Aadhaar integration can directly upload it to the platform and also send the messages via mobile and email.
*	Labs would no longer need to maintain individual Databases as they have a low cost model with better implemented features.
Advantages to Users –
*	The User no longer needs to keep a Physical record of all their medical data as it is available in their MedRep account.
*	Many a times a user is not able to correctly explain all the complications they must have had in the past and using MedRep their problem is solved as the Doctor already has a clear picture of all the treatments the patient has gone through in the past.
*	No need to collect reports from different labs and using different portals for the same.

ADVANTAGES OFFERED TO LABS
-----
*	No need to physically provide medical reports to the users. Aadhaar integration can directly upload it to the platform and also send the messages via mobile and email.
*	Labs would no longer need to maintain individual Databases as they have a low cost model with better implemented features.
Advantages to Users –
*	The User no longer needs to keep a Physical record of all their medical data as it is available in their MedRep account.
*	Many a times a user is not able to correctly explain all the complications they must have had in the past and using MedRep their problem is solved as the Doctor already has a clear picture of all the treatments the patient has gone through in the past.
*	No need to collect reports from different labs and using different portals for the same.

ADVANTAGES OFFERED TO USERS
-----
*	The User no longer needs to keep a Physical record of all their medical data as it is available in their MedRep account.
*	Many a times a user is not able to correctly explain all the complications they must have had in the past and using MedRep their problem is solved as the Doctor already has a clear picture of all the treatments the patient has gone through in the past.
*	No need to collect reports from different labs and using different portals for the same.

CONCLUSION
------

Our product MedRep falls in line with the governments plans to have  totally unique identity that can be used for various applications in the near future. The product benefits both the entities involved Users and Labs. Later addition of features such as medical insurance integration , government subsidy, etc. also become much easier thereby making the system highly flexible. This makes it easier to have a unified system in India just like Social Security Number used other countries.
