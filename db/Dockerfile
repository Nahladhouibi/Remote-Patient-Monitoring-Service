# Utiliser l'image officielle PostgreSQL
FROM postgres:latest

# Copier le fichier SQL dans le répertoire d'initialisation de PostgreSQL
COPY init.sql /docker-entrypoint-initdb.d/

# Exposer le port PostgreSQL (ceci est généralement facultatif car les ports sont exposés automatiquement)
EXPOSE 5432
