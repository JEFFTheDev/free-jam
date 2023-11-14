# Free Jam

This project aws started with the goal to help beginner guitar players to improve their playing and learn new songs. Users can select an album and choose which song they want to learn. The song is then played and the chords and their timings are displayed on screen.

![Alt text](./docs/assets/chords.png)

## Technologies used

| Name               | Purpose                     |
| ------------------ | --------------------------- |
| React (typescript) | Frontend                    |
| .NET 7             | Backend                     |
| Tailwind           | Frontend Styling            |
| Caddy              | Reverse proxy               |
| docker (compose)   | Easy deployment of services |
| MinIO              | S3 implementation           |
| MSSQL              | Database                    |

## Setup

- At first launch, the docker compose will insert some test data
- A reverse proxy is used to allow access to the above mentioned tools
  - frontend is available at root (localhost)
  - localhost/bucket for access to the images
  - localhost/dev/bucket for access to the UI for the S3 bucket

> **_NOTE:_** The backend is currently not included in docker compose due to some issues with dotnet watch. Run the backend seperately with dotnet watch
> 
```bash
docker compose up -d
```

TODO:
- Song Editor
- Responsiveness is average
- Fix dotnet watch in docker compose