# Roti & Routine
Mobile-first Pakistani meal planner. Static HTML, CSS, JavaScript and JSON. No build, backend, API key or package installation needed.

## Folder structure
```text
roti-routine/
├── index.html
├── .nojekyll
├── README.md
├── css/
│   └── styles.css
├── js/
│   └── app.js
├── data/
│   ├── config.json       # Default profile and targets
│   ├── foods.json        # Food database: edit/add entries here
│   ├── recipes.json      # Hostel recipes referencing food IDs
│   └── weekly-plan.json  # Seven editable starting menus
└── assets/
    └── images/
        └── README.md     # Add your food/recipe photos here
```

## Deploy on GitHub Pages
1. Extract the ZIP. Upload the **contents** of `roti-routine/` to your repository root (index.html must be at the root).
2. In GitHub: Settings → Pages → Deploy from a branch → main → / (root) → Save.
3. Open the Pages URL when deployment completes. All asset paths are relative, so repository subpaths work.
4. To preview locally, run `python3 -m http.server 8000` inside this folder, then visit http://localhost:8000.

Do not double-click index.html: browsers often block fetching JSON through file://. This version requires HTTP hosting. There are no CDN dependencies.

## Add or hardcode foods
Edit `data/foods.json`, which is an array. Copy an existing entry and give it a unique stable ID:
```json
{
  "id": "my-pulao",
  "name": "My hostel chicken pulao",
  "unit": "g",
  "portion": 300,
  "kcal": 550,
  "protein": 24,
  "tier": "B",
  "group": "Meals",
  "tip": "Whole cooked dish including chicken. Choose less oily rice.",
  "image": "assets/images/my-pulao.jpg",
  "imageAlt": "Chicken pulao with salad"
}
```
Nutrition is **for the base portion**, not always per 100 g. Adding 150 g of the example calculates 275 kcal and 12 g protein. Use cooked edible weight unless explicitly stated. Do not include bones, shells or duplicate oil already included in the dish.

- IDs must be unique. Keep IDs stable because saved plans reference them.
- Units can be g, ml, cup, roti, piece, etc.
- `portion` must be positive; kcal and protein must be non-negative numbers.
- Tiers: A everyday foundations; B portion-aware choices; C occasional richer foods; D limit as a daily habit. These are practical categories, not bans.
- `group` supplies the category filter automatically.
- Use ordinary JSON: double quotes, no comments, no trailing commas.
- The interface also supports adding custom foods without editing source files.

## Add pictures
Put your own JPG, PNG, WebP or SVG file into `assets/images/`. Set `image` on the matching food or recipe to its **path relative to index.html**. Add descriptive `imageAlt`. Leave image as `""` for a text-only card. Missing images hide gracefully. Photos are optional; none are bundled. Prefer compressed photos around 800 px wide; filenames and case must match exactly on GitHub.

## Edit recipes
`data/recipes.json` is an array of objects. Example:
```json
{
  "id": "egg-yogurt",
  "name": "Boiled egg & yogurt bowl",
  "minutes": 15,
  "equipment": "Saucepan, stove, bowl",
  "servings": 1,
  "ingredients": [
    { "foodId": "egg", "quantity": 2 },
    { "foodId": "yogurt", "quantity": 150 },
    { "foodId": "salad", "quantity": 100 }
  ],
  "steps": ["Boil eggs until whites and yolks are firm.", "Cool, peel and chop.", "Combine with yogurt and chopped salad; serve promptly."],
  "note": "Make one serving if you cannot refrigerate leftovers.",
  "image": "",
  "imageAlt": "Egg and yogurt bowl"
}
```
Every foodId must exist in foods.json. Quantities use the referenced food's unit. `servings` is the yield of the entire recipe and must be positive. Nutrition per serving = sum of ingredient nutrition / servings. The Add button scales ingredients by the number of servings selected and adds them to the selected day/meal. Seasoning and lemon are omitted from small recipe estimates; add separate food entries for substantial extras.

Included recipes: egg-yogurt bowl, chickpea chaat, milk oats, lentil bowl, chicken-yogurt wrap, fruit-peanut snack. They list ingredients, equipment, time, servings, steps, calories and protein. They are options, not compulsory purchases.

## Default profile and targets
Edit `data/config.json`. Defaults: age 21, height 181 cm, weight 78 kg, male, sedentary (activity factor 1.2), 1,850 kcal and 125 g protein.

The Targets tab allows profile changes. “Save profile only” preserves targets. “Calculate and apply targets” uses Mifflin–St Jeor resting energy × activity factor minus 300 kcal, rounded to 10 kcal, with a general floor of 1,500 for male / 1,200 for female estimates; protein is 1.6 g/kg. This calculator is for adults and is an estimate, not a prescription. Calculating targets does not automatically resize the weekly menus.

## Weekly plan and saved data
`weekly-plan.json` contains seven arrays, Monday to Sunday. Each item is `{ "meal": 1, "id": "roti", "q": 2 }`. Meal indices: 0 Morning, 1 Lunch, 2 Evening, 3 Dinner, 4 Night/extras. q uses the food's unit. Sample menus are roughly 1,730–1,930 kcal and may be below the protein target; recommendations flag shortfalls.

Menus, custom foods, profile and targets save in localStorage on the current browser and origin. Export/import JSON backups from Targets. No account or cloud synchronization. Source food/recipe edits load on refresh; existing saved menus remain. Reset menus to load the updated starting menus. To reset the profile to config defaults, clear this site's localStorage (this also removes saved plans unless exported). Older v1 backups are supported and keep the current/default profile if absent.

## Nutrition and food safety
All calories and protein are estimates. Restaurant recipes can vary greatly; packaged labels or known recipe calculations are preferable. Nuts/seeds are measured without shells. Raw/dry vs cooked food weights are explicitly distinguished.

References:
- https://fdc.nal.usda.gov/ — food composition reference
- https://www.nhs.uk/live-well/healthy-weight/managing-your-weight/understanding-calories/
- https://www.fda.gov/food/buy-store-serve-safe-food/what-you-need-know-about-egg-safety

Cook eggs until whites and yolks are firm. Use pasteurized yogurt/milk; boil raw milk before use. Keep perishables refrigerated at ≤4°C, and don't leave cooked egg dishes out over 2 hours (1 hour above 32°C). If your hostel has no fridge, prepare one serving and eat promptly. Follow package storage directions.

## Troubleshooting
- Data loading error: check JSON syntax, paths and HTTP hosting.
- A new photo does not appear: check exact case, filename and image path, then refresh.
- Old menu after editing JSON: use Reset day / Restore sample menus; saved customization is intentionally preserved.
- Changing targets does not change menus: portions remain under your control.
- Food removed from JSON: also remove its references from weekly-plan and recipes. Saved plans may still contain it; reset affected days.
