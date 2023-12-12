FROM postgres:latest
ENV DB_DATABASE zelis_ideathon
ENV DB_USER postgres
ENV DB_PASSWORD postgres
COPY db.sql /docker-entrypoint-initdb.d/
