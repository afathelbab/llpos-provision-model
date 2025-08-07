# **Application Documentation: LLPOS Swedbank Provision Model**

---

### 📋 **Application Overview**

The **LLPOS Swedbank Provision Model** is a single-page web application built with **React.js**. It's designed to help sales representatives quickly calculate a deal's profitability and their potential commission. By inputting key deal metrics, users can instantly see if a deal meets acceptance criteria and what the financial outcomes are. The app is ideal for use as a static site, such as on GitHub Pages.

---

### 💻 **Technology Stack**

- **React.js**: A JavaScript library used for building the user interface.
- **JavaScript (ES6+)**: The core programming language for the application's logic.
- **CSS**: For all styling and layout.
- **gh-pages**: An npm package that simplifies the process of deploying the app to GitHub Pages.

---

### 📝 **Key Features and Logic**

The application is structured into three main sections: Deal Inputs, Hardware Selection, and Calculation Results. The core logic is driven by a single React `useEffect` hook that recalculates all outputs dynamically as the user changes any input.

#### **1. Deal Inputs**
This section contains all the variables an agent can modify to model a deal. The inputs are:
- **Monthly Subscription Amount**: The monthly fee in DKK.
- **Expected Merchant Annual Sales Amount**: The total expected sales volume in DKK over a year.
- **Merchant Transaction Fee**: A percentage-based fee chosen from a dropdown list. Higher fees (above 0.69%) are visually highlighted to encourage selection.
- **Softpay Licenses Needed**: The number of Softpay licenses required.
- **Contract Binding Duration**: The length of the contract in months, which influences the sales representative's percentage.

#### **2. Hardware Selection**
Agents can select one or more hardware devices for the deal.
- Selecting a device via a **checkbox** reveals input fields for **quantity** and **sales price**.
- The `cost` of each device is displayed for reference, and the logic ensures that if the **Contract Binding Duration** is **0 months**, the sales price cannot be set below the device's cost.
- New labels dynamically display the **Total Cost** and **Total Price** for the selected quantity, providing a quick summary for the agent.

#### **3. Core Calculation Logic**
All financial calculations are performed automatically and update in real-time. The key calculations are:
- **`Remaining Fee`**: `Merchant Transaction Fee - Acquirer Fee`
- **`LL Share`**: `40%` for `Merchant Transaction Fee <= 0.69%`, and `50%` otherwise.
- **`Sales Rep Percentage`**: `15%` for `0 months`, `20%` for `12 months`, `22%` for `24 months`, and `24%` for `36 months`.
- **`Annual Subscription Revenue`**: `12 * Monthly subscription amount`
- **`Annual Profit Share Revenue`**: `Expected Annual Sales * Remaining Fee * LL Share`
- **`Hardware Revenue`**: `Total sum of ((Sales Price - Cost) * Quantity)` for all selected devices.
- **`Total Revenue`**: `Annual Subscription Revenue + Annual Profit Share Revenue + Hardware Revenue + Hardware Gifting - Annual Softpay Cost`.
- **`Sales Rep Commission`**: `(Total Revenue * Sales Rep Percentage) + Bonus`
  - A bonus of `750 DKK` is added if the total `Hardware Revenue` is greater than `1500 DKK`.

#### **4. Deal Acceptance**
The deal is marked as **Accepted** only if two conditions are met:
1. The **`Total Revenue`** is positive.
2. The monthly average of the `Annual Subscription Revenue` and `Annual Profit Share Revenue` is greater than `250 DKK`.

---

### ⚙️ **Development and Deployment**

- **Installation**: To run the project locally, navigate to the project directory in your terminal and run `npm install`.
- **Local Development**: To start the local development server and view the app in your browser, run `npm start`.
- **Deployment to GitHub Pages**: After configuring the `homepage` in `package.json` and installing the `gh-pages` package, deploy the app with the `npm run deploy` command.
