# API för arbetslivserfarenhet
Repot innehåller källkoden för ett REST API. Det hanterar olika arbetslivserfarenheter och har funktionalitet för CRUD. 

## Länk
Grundlänken till API:et är [https://workexperienceapi.onrender.com/api/employers](https://workexperienceapi.onrender.com/api/employers).

## Användning
API:et tar emot Get, Post, Put och Delete metoder. 

| Metod     | Länk          | Resultat                          |
|-----------|---------------|-----------------------------------|
| Get       | /employers    | Hämtar alla erfarenheter          |
| Get       | /employers/:id| Hämtar specifik erfarenhet        |
| Post      | /employers    | Lägger till ny erfarenhet         |
| Put       | /employers/:id| Uppdaterar existerande erfarenhet |
| Delete    | /employers/:id| Tar bort vald erfarenhet          |

För att lägga till en ny erfarenhet eller redigera en existerande, med Post eller Put, måste ett objekt med en nyckel för varje värde läggas till.

## Svar
Vid anrop till API:et returneras objekt i JSON-format. Se exempel nedan.

```json
{
    "id": 1,
    "companyname": "Hälsinglands Utbildningsförbund",
    "jobtitle": "Kommunikatör",
    "location": "Bollnäs",
    "startdate": "2024-01-01",
    "enddate": "2024-12-30",
    "description": "Skötte marknadsföring via sociala medium och uppdaterade webbplatsen."
}
```

