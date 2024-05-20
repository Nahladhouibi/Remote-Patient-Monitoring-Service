# Utiliser une image officielle PostgreSQL comme image de base
FROM postgres:latest

# Définir les variables d'environnement
ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=0000
ENV POSTGRES_DB=remote

# Copier le fichier SQL dans le répertoire d'initialisation de PostgreSQL
COPY init.sql /docker-entrypoint-initdb.d/

# Exposer le port PostgreSQL
EXPOSE 5432
