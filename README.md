


Réalisation d'une page de login sécurisé avec le framework Angular.


# Lancer le code
- Installer Node.JS ( version : v18.18.2 ) et npm ( version : 9.8.1 ) :
  : -  node --version
  : - npm --version
- Installer Angular Cli : 
  : - npm install - g @angular/cli 
- Cloné ou Téléchargé le zip et le dézippé dans un dossier.
- Ouvrez un terminal dans le dossier du projet et lancé : 
  : - npm install
- Ensuite, nous allons lancer l'application ( vous trouverez un lien localhost dans le terminal)  avec  :
  : - ng serve
- Et enfin dans un second terminal dans le même répertoire, nous allons lancer le serveur JSON :
  : - npm run server

# Base de données
J'ai utilisé un JSON pour ma base de données, la base est vide.
# Fonctionnement
La page est constitué de deux champs de texte "Identifiant" et "Mots de passe" et trois bouttons.
- Le premier bouton permet de remettre à zéro les deux champs de texte.
- Le second bouton permet de se connecter (Lance une alerte lorsque le login a fonctionné sinon une erreur).
- Le troisième bouton permet d'ajouter l'identifiant et le mot de passe à la base de données.

# Sécurité
J'ai d'abord ajouté un regex pour les "mots de passe" afin d'avoir un mdp robuste.

Regex 

```typescript
let  mdpStrongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
let  mdpMediumRegex =  new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
```


Il est possible d'acceder a la base de données lorsque le serveur est lancé avec l'URL : http://localhost:3000/users

Ainsi, les identifiants et mots de passe sont chiffrés puis ajoutés à la base de données, ce qui rend les identifiants et mots de passe inexploitable.

Chiffrement
```typescript
let  user = { 'id':  id,  'mdp':  mdp};
let  dataEncrypt = { 'user' : this.CryptoJS.AES.encrypt(JSON.stringify(user),  clé).toString()};
```
Déchiffrement
```typescript
let  bytes = this.CryptoJS.AES.decrypt(user.user,  clé);
let  decryptedData = JSON.parse(bytes.toString(this.CryptoJS.enc.Utf8));
```


