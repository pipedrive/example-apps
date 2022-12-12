### Floating Window Demo App

<img width="600" alt="Screenshot 2022-12-01 at 01 58 24" src="https://user-images.githubusercontent.com/19341550/204933908-4d9cdc9f-4e93-424d-ab14-c6375e6c707e.png">

<img width="600" alt="Screenshot 2022-12-01 at 01 59 39" src="https://user-images.githubusercontent.com/19341550/204933903-3c3a8100-e539-46d0-a399-e271de717d0d.png">

<img width="600" alt="Screenshot 2022-12-01 at 02 00 34" src="https://user-images.githubusercontent.com/19341550/204933896-d7fcd114-7f4e-43d9-846b-95dbcf92c945.png">

### Running the app

1. Clone the repo, `cd` into the app directory, and run `npm i` to install all the required dependencies.

2. Use ngrok to expose the port 3000 using `ngrok http 3000` command. Create a Pipedrive app and add Custom UI Floating window with the ngrok URL pointing to root.

3. Based on the created Pipedrive app, copy the client id, secret to the `.env.example` file. Rename this file to `.env`.

4. Generate the database by using the `npx prisma db push` command.

```
% npx prisma db push
Environment variables loaded from .env
Prisma schema loaded from prisma/schema.prisma
Datasource "db": SQLite database "dev.db" at "file:./dev.db"

SQLite database dev.db created at file:./dev.db

🚀  Your database is now in sync with your Prisma schema. Done in 28ms

✔ Generated Prisma Client (4.6.1 | library) to ./node_modules/@prisma/client in 58ms
```

5. You can start the app by running the `npm run dev` command.

### Authorization Flow

[![](https://mermaid.ink/img/pako:eNqtVF1r2zAU_SsXP4wNvPU9jEK7rBDYF-3y5hdZuo5F7KtMkttmpf99R7KdLG3ZYCwPJtjX59zzYT0U2hkuFkXgHwOL5qVVG6_6StQQnQx9zb6S9ert-fkN-1v2r79eDLF9s6CrzqloZUN3Voy7I7djOcM9w6aSk9nn735oWW_JNqQocAjWCWnntpYBFlvq1f3FhskGUp1nZfaYiqTEpFu3qrOGsF8X55fS4K2ynao7roTwe8q_XoF0HG7cIOYdXQOXlNagp-i2LPSKXGzZHzYyHIEZMu9OYcxGcjLiZ0MS6BrTQJbI95Euvq2AhfWt4FU5IL2v_dk5WWmc7-EZ7mw6V6uu21fCXeDfdIiLf9OyVFHVKvCCLnE12ImwNw2B_coQUvR77IsMS9JHn0Gs2xSXZ-28Ib63IYaR4YuLTN5uWghs6Ii_3gE7DNmkZugIlWidtz-zhjKzaqioFUjW159II6wIPxQJ381Eo_ica1qRRPVckjXl5H6JwcZzaMcYSmy2s5Aw229HeaYed02xm2nDmQK-5VRx9ZMP43D6zXKet_Ca4-BH9AkobwkVhiVaBfLGu56Wl0e0F4s1yX6pyicNS02aul0foktPPmbJR5b_V68Z8TTiJ0Z8TzsgNs9zFtgtLTt7lxwedrCd5zyXjM_dpD5N9TsRmr9RGyf-XPEXMktd_5fcLjslW-AE1DPwn7O5cl4nzpPqTmsJ2PKlKIue4Z01OAgf0tOqgKaeq2KBv12yrSoqecRgOhZv9qKLRfQDl8Voy3RqFosGrcFdhnrnP49Haz5hH38B8VTc5w?type=png)](https://mermaid-js.github.io/mermaid-live-editor/edit#pako:eNqtVF1r2zAU_SsXP4wNvPU9jEK7rBDYF-3y5hdZuo5F7KtMkttmpf99R7KdLG3ZYCwPJtjX59zzYT0U2hkuFkXgHwOL5qVVG6_6StQQnQx9zb6S9ert-fkN-1v2r79eDLF9s6CrzqloZUN3Voy7I7djOcM9w6aSk9nn735oWW_JNqQocAjWCWnntpYBFlvq1f3FhskGUp1nZfaYiqTEpFu3qrOGsF8X55fS4K2ynao7roTwe8q_XoF0HG7cIOYdXQOXlNagp-i2LPSKXGzZHzYyHIEZMu9OYcxGcjLiZ0MS6BrTQJbI95Euvq2AhfWt4FU5IL2v_dk5WWmc7-EZ7mw6V6uu21fCXeDfdIiLf9OyVFHVKvCCLnE12ImwNw2B_coQUvR77IsMS9JHn0Gs2xSXZ-28Ib63IYaR4YuLTN5uWghs6Ii_3gE7DNmkZugIlWidtz-zhjKzaqioFUjW159II6wIPxQJ381Eo_ica1qRRPVckjXl5H6JwcZzaMcYSmy2s5Aw229HeaYed02xm2nDmQK-5VRx9ZMP43D6zXKet_Ca4-BH9AkobwkVhiVaBfLGu56Wl0e0F4s1yX6pyicNS02aul0foktPPmbJR5b_V68Z8TTiJ0Z8TzsgNs9zFtgtLTt7lxwedrCd5zyXjM_dpD5N9TsRmr9RGyf-XPEXMktd_5fcLjslW-AE1DPwn7O5cl4nzpPqTmsJ2PKlKIue4Z01OAgf0tOqgKaeq2KBv12yrSoqecRgOhZv9qKLRfQDl8Voy3RqFosGrcFdhnrnP49Haz5hH38B8VTc5w)

### APIs using Session Credentials

[![](https://mermaid.ink/img/pako:eNp1UsFu2zAM_RVCpwRr2gzYLj4UKFYMCIZ1xYLcfNEkJiYiix5Fp8uK_vuotGmbddNBoCn5vafHd-8CR3SNK_hzxBzwmvxGfN9mPyrnsf-B0ubVYnZ5uUTZoUyubhfTBj75lApgjgNTVlAGqQBFIXr1cAEDypqlB7bCK3Fu8w0rgtCmU-A1nMDdMATBiFnJG64XhMGXghHw15AokKb9OXzLaW99k1eM4YlwVgYMtKZgJ_vEPgKVp5_b_IrkzQs6DNsCJhIKlmIKITBvCUE7rxVk5xMZhk96PKF6f8zWBFun4Lc0YBTa4WR5_eXZIavhjrR7Fvfuhe3Vgyc-BGubj1vM00f4U8C_5X9HHSUXc6EMnAvChNYw2JdBTv-lb7Vo4DPLnZdottrAVou6H-dU1Nt0QufzBqu7rB0KJN5QOG8zJmN4MSGz_t-ISvRh_v7i43wOM7gatWOh34cMHGZGUidj0XFnrkfpPUXL332Fap2x9ti6xspUk9K6Nj_YxZrG5T4H16iMeObGwXJ2DKtr1maidTGSsnx9TPQh2A9_AGQ2_kE?type=png)](https://mermaid-js.github.io/mermaid-live-editor/edit#pako:eNp1UsFu2zAM_RVCpwRr2gzYLj4UKFYMCIZ1xYLcfNEkJiYiix5Fp8uK_vuotGmbddNBoCn5vafHd-8CR3SNK_hzxBzwmvxGfN9mPyrnsf-B0ubVYnZ5uUTZoUyubhfTBj75lApgjgNTVlAGqQBFIXr1cAEDypqlB7bCK3Fu8w0rgtCmU-A1nMDdMATBiFnJG64XhMGXghHw15AokKb9OXzLaW99k1eM4YlwVgYMtKZgJ_vEPgKVp5_b_IrkzQs6DNsCJhIKlmIKITBvCUE7rxVk5xMZhk96PKF6f8zWBFun4Lc0YBTa4WR5_eXZIavhjrR7Fvfuhe3Vgyc-BGubj1vM00f4U8C_5X9HHSUXc6EMnAvChNYw2JdBTv-lb7Vo4DPLnZdottrAVou6H-dU1Nt0QufzBqu7rB0KJN5QOG8zJmN4MSGz_t-ISvRh_v7i43wOM7gatWOh34cMHGZGUidj0XFnrkfpPUXL332Fap2x9ti6xspUk9K6Nj_YxZrG5T4H16iMeObGwXJ2DKtr1maidTGSsnx9TPQh2A9_AGQ2_kE)