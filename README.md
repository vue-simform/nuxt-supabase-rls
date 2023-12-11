# Nuxt + Supabase (with RLS & Policies) POC

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Demo

[Link](https://simformsolutionspvtltd-my.sharepoint.com/:v:/r/personal/sushil_simformsolutions_com/Documents/POCs/Nuxt%20Supabase.mkv?csf=1&web=1&e=1Oq32W&nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJTdHJlYW1XZWJBcHAiLCJyZWZlcnJhbFZpZXciOiJTaGFyZURpYWxvZy1MaW5rIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXcifX0%3D)

## Clone

Open the folder where you want to setup the project

```bash
git clone https://github.com/vue-simform/nuxt-supabase-rls .
npm install
```

## Supabase Setup

1. Login To [Supabase](https://supabase.com)
2. Create a new project.
   > Note: Remember / copy your database password to somewhere safe.

## Project Setup

1. Go to [Supabase Dashboard](https://supabase.com/dashboard/projects) & select your project while you have just created
2. Go to setting, then under database, API tab.
3. Now open your project, create a `.env` file in the projects root.

```
SUPABASE_URL="https://abc.supabase.co"
SUPABASE_KEY="YOUR_KEY"
SUPABASE_SERVICE_KEY="YOUR_SERVICE_KEY"
```

4. Follow the above `.env` format and copy & past **your** credentials in that file.

## Database Setup

1. To have the same replica of DB structure as mine. Go to Supabase SQL Editor
2. Copy paste [this](docs/migrations.txt) into your Supabase SQL editor.
3. Next step is to select all (cmd + A / control + A) & then Run Selected.

## Generate types

> As we are using typescript Generating Types is also a important step to get all the type hinting in our project

1. Go to project Settings, & then General where you will find, project referance ID
2. Run the following command in the projects root

```
npx supabase gen types typescript --project-id YOUR_PROJECT_REFERANCE_ID > database-generated.types.ts
```

> Note: Substitute your project referance id instead of YOUR_PROJECT_REFERANCE_ID

## Run the project

```bash
npm run dev
```

Start the development server on `http://localhost:3000`:

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## Features

1. Use of modern tools like Nuxt 3, Typescript & Tailwind
1. Ready made & fully scalable Auth systeam
1. Nuxt UI library integrations for seemless user experience
1. Supabase tables, RLS, policies, triggers setup pre configued and fully scalable.
1. vee-validate with composition api pre setup in auth pages.
1. Route guard added

## Page Structure

```
/ - Home Page

/login - Login Page

/register - Registration Page

/profile - Profile Page
Auth Guard Enabled

/organisations - List of users organisations (organisations user is part of)
Auth Guard Enabled

/organisations/[id] - Organisations specific page
Auth Guard Enabled
Note here, if user try to access specific organisation by url,
then user should be the part of that organiastion, otherwise
it will show that user is not part of organisation as RLS is enabled

/organisations/[id]/projects - List of all Organisations project
Auth Guard Enabled

/organisations/[id]/projects/[projectId] - Organisation Project specific page
Auth Guard Enabled
Here also same check as Organisation is applied
```

## Database Schema

![image info](docs/schema.png)
