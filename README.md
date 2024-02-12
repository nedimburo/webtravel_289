# ENG: Travel Agency Project
**Simple Travel Agency Project created with MongoDB, Express.js, React and Node.js technologies.**
## Application Users
**1. Users**: Regular users that create their account through registration. They get the role "USER" and "ACTIVE" status.<br />
If the user has "DEACTIVATED" status he can't login to the site with his account.<br />
User functionalities include: Can register independently, can view travel offers, can ask(add) questions to already published travel offers,<br />
can sign up(apply) for a travel, can see all of the previous travels he applied for, can filter travel offers based on their category. <br />
**2. Admin**: Access to the admin dashboard. Admin functionalities: Manages users and travel offers, can add new users, update already exsiting users,
put users into "DEACTIVATED" status(instead of deleting), can create new travel offers, update already existing travel offers and delete them,
has access to questions made by users on travel offers and can remove them.<br />
**3. Guests**: Can view and filter travel offers and questions made on them.
## Application Setup
Clone this repository first.<br />
Then open terminal for server and run the these commands:<br />
```
cd server && npm install
```
Then open terminal for client and run these commands:<br />
```
cd client && npm install
```
After the installation finishes for the both terminals run the following command in both terminals:<br />
```
npm start
```

# BA: Turistička Agencija Projekat
**Jednostavan projekat turističke agencije kreiran uz MongoDB, Express.js, React i Node.js tehnologije.**
## Korisnici Aplikacije
**1. Korisnici**: Redovni korisnici koji kreiraju svoj profil putem registracije. Oni dobijaju ulogu "USER" i "ACTIVE" status.<br />
Ako korisnik ima status "DEACTIVATED" ne može se prijaviti na stranicu sa svojim profilom.<br />
Korisničke funkcionalnosti uključuju: Može se samostalno registrirati, može vidjeti ponude putovanja, može postavljati (dodavati) pitanja već objavljenim ponudama putovanja,
može se prijaviti na putovanje, može vidjeti sva prethodna putovanja na koja se prijavio, može filtrirati ponude putovanja na osnovu njihove kategorije.<br />
**2. Admin**: Pristup stranici namjenjenoj administratorima. Administratorske funkcije: Upravlja korisnicima i ponudama putovanja, može dodati nove korisnike, ažurirati postojeće korisnike,
staviti korisnike u status "DEACTIVATED" (umjesto brisanja), mogu kreirati nove ponude putovanja, ažurirati već postojeće ponude putovanja i brisati ih,
ima pristup pitanjima korisnika o ponudama putovanja i može ih ukloniti.<br />
**3. Gosti**: Mogu pregledati i filtrirati ponude putovanja i pitanja postavljena na njima.
## Postavka Aplikacije
Prvo klonirajte ovaj repozitorij.<br />
Zatim otvorite terminal za server i pokrenite sljedeće komande:<br />
```
cd server && npm install
```
Zatim otvorite terminal za client-a i pokrenite sljedeće komande:<br />
```
cd client && npm install
```
Nakon završetka instalacije za oba terminala pokrenite sljedeću komandu u oba terminala:<br />
```
npm start
```
