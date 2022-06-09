https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-ubuntu/
10  wget -qO - https://www.mongodb.org/static/pgp/server-5.0.asc | sudo apt-key add -
11  lsb_release -dc
12  echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/5.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-5.0.list
13  sudo apt update
14  sudo apt-get install -y mongodb-org
15  history


image, titre, auteur, résumé, date de création, notation

db.books.insertOne({title: "titre", author: "auteur", summary: "resume", img: "/img/img1.png", date: "07-06-2022", rating: "5", tag: "default"})


reverse proxy
forwarding
