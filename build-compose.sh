#!/bin/bash
sudo docker-compose -f /home/angelique/Desktop/boatusers-react/boatusers/docker-compose.yml config > _tmp_A.yml

sudo docker-compose -f /home/angelique/Desktop/boatusers-react/server-buApp/docker-compose.yml config > _tmp_B.yml

sudo docker-compose \
  -f _tmp_A.yml \
  -f _tmp_B.yml \
  config > docker-compose.yml

rm _tmp_*.yml
sudo docker-compose up