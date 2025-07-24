// App.js
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  // --- State for Division 1 (Subscriptions) ---
  const [mainSubscriptions, setMainSubscriptions] = useState([]);
  const [addOnSubscriptions, setAddOnSubscriptions] = useState([]);
  const [totalSubscriptionAmount, setTotalSubscriptionAmount] = useState(0);
  const [subscriptionBonus, setSubscriptionBonus] = useState(0);

  // Placeholder data for subscriptions (you will provide actual data later)
  const availableMainSubscriptions = [
    { id: 'm1', name: 'SoftPOS 2.0 Dual Display', amount: 350 },
    { id: 'm2', name: 'SoftPOS 2.0 Single Display & Terminal', amount: 350 },
    { id: 'm3', name: 'SoftPOS 2.0 Terminal', amount: 300 },
    { id: 'm4', name: 'POS Light', amount: 300 },
    { id: 'm5', name: 'Cloud@Connect 2.0 (Mellem)', amount: 300 },
    { id: 'm6', name: 'Cloud@Connect 2.0 (Lille)', amount: 100 },
  ];

  const availableAddOnSubscriptions = [
     { id: 'a4', name: 'QR Koder', amount: 200 },
    { id: 'a5', name: 'Hjemmeside', amount: 200 },
    { id: 'a1', name: 'Softpay Ekstra Terminal', amount: 100 },
    { id: 'a2', name: 'Mobile Pay Integration', amount: 100 },
    { id: 'a3', name: 'Wolt Integration', amount: 29 },   
  ];

  // Function to handle selection of main subscriptions
  const handleMainSubscriptionChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setMainSubscriptions([...mainSubscriptions, value]);
    } else {
      setMainSubscriptions(mainSubscriptions.filter(subId => subId !== value));
    }
  };

  // Function to handle selection of add-on subscriptions
  const handleAddOnSubscriptionChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setAddOnSubscriptions([...addOnSubscriptions, value]);
    } else {
      setAddOnSubscriptions(addOnSubscriptions.filter(subId => subId !== value));
    }
  };

  // Effect to recalculate total amount and bonus whenever selections change
  useEffect(() => {
    let currentTotal = 0;
    mainSubscriptions.forEach(subId => {
      const sub = availableMainSubscriptions.find(s => s.id === subId);
      if (sub) currentTotal += sub.amount;
    });
    addOnSubscriptions.forEach(subId => {
      const sub = availableAddOnSubscriptions.find(s => s.id === subId);
      if (sub) currentTotal += sub.amount;
    });
    setTotalSubscriptionAmount(currentTotal);

    let bonus = 0;
    if (currentTotal < 200) {
      bonus = 0;
    } else if (currentTotal >= 200 && currentTotal < 450) {
      bonus = 2 * currentTotal;
    } else if (currentTotal >= 450) {
      bonus = 2.5 * currentTotal;
    }
    setSubscriptionBonus(bonus);
  }, [mainSubscriptions, addOnSubscriptions, availableMainSubscriptions, availableAddOnSubscriptions]);


  // --- State for Division 2 (Profit Share Package) ---
  const profitSharePackages = [
    { id: 'p1', name: 'Package 1 (0.49%)', bonus: 0 },
    { id: 'p2', name: 'Package 2 (0.59%)', bonus: 0 },
    { id: 'p3', name: 'Package 3 (0.69%)', bonus: 0 },
    { id: 'p4', name: 'Package 4 (0.79%)', bonus: 300 },
    { id: 'p5', name: 'Package 5 (0.89%)', bonus: 400 },
    { id: 'p6', name: 'Package 6 (0.99%)', bonus: 600 },
    { id: 'p7', name: 'Package 7 (1.19%)', bonus: 1000 },
  ];
  const [selectedProfitSharePackage, setSelectedProfitSharePackage] = useState(null);
  const [profitShareBonus, setProfitShareBonus] = useState(0);

  // Function to handle selection of profit share package
  const handleProfitSharePackageChange = (event) => {
    const selectedId = event.target.value;
    setSelectedProfitSharePackage(selectedId);
  };

  // Effect to update profit share bonus when package selection changes
  useEffect(() => {
    const packageData = profitSharePackages.find(p => p.id === selectedProfitSharePackage);
    if (packageData) {
      setProfitShareBonus(packageData.bonus);
    } else {
      setProfitShareBonus(0); // Reset if no package is selected
    }
  }, [selectedProfitSharePackage, profitSharePackages]);


  // --- State for Division 3 (Annual Transaction Factor) ---
  const annualTransactionsOptions = [
    { id: 't1', name: '0-3M DKK', bonus: 0 },
    { id: 't2', name: '3-5M DKK', bonus: 300 },
    { id: 't3', name: '5-7M DKK', bonus: 500 },
    { id: 't4', name: '7-10M DKK', bonus: 700 },
    { id: 't5', name: '>10M DKK', bonus: 1000 },
  ];
  const [selectedAnnualTransactions, setSelectedAnnualTransactions] = useState(''); // Empty string for default "Select..."
  const [annualTransactionsBonus, setAnnualTransactionsBonus] = useState(0);

  // Function to handle selection of annual transactions
  const handleAnnualTransactionsChange = (event) => {
    const selectedId = event.target.value;
    setSelectedAnnualTransactions(selectedId);
  };

  // Effect to update annual transactions bonus when selection changes
  useEffect(() => {
    const selectedOption = annualTransactionsOptions.find(option => option.id === selectedAnnualTransactions);
    if (selectedOption) {
      setAnnualTransactionsBonus(selectedOption.bonus);
    } else {
      setAnnualTransactionsBonus(0); // Reset if no option is selected or default is chosen
    }
  }, [selectedAnnualTransactions, annualTransactionsOptions]);


  // --- State for Division 4 (Hardware) ---
  const hardwareOptions = [
    { id: 'h1', name: 'Landi C20Pro GMS (Dual Display)', cost: 3665 },
    { id: 'h2', name: 'Landi C20 Pro (Single Display)', cost: 3155 },
    { id: 'h3', name: 'Landi M20  (GMS) 4GB+64GB', cost: 1455 },
    { id: 'h5', name: 'Sunmi printer', cost: 1126 },
    { id: 'h4', name: 'Cash Drawer', cost: 330 },
  ];
  // Stores { hardwareId: sellingPrice, ... }
  const [selectedHardwarePrices, setSelectedHardwarePrices] = useState({});
  const [hardwareBonus, setHardwareBonus] = useState(0);

  // Function to handle hardware checkbox selection
  const handleHardwareSelection = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      // Add hardware to selected list with a default/recommended price (e.g., its cost)
      const hardware = hardwareOptions.find(h => h.id === value);
      setSelectedHardwarePrices(prevPrices => ({
        ...prevPrices,
        [value]: hardware ? hardware.cost : 0 // Default to cost if found, else 0
      }));
    } else {
      // Remove hardware from selected list
      setSelectedHardwarePrices(prevPrices => {
        const newPrices = { ...prevPrices };
        delete newPrices[value];
        return newPrices;
      });
    }
  };

  // Function to handle selling price input change for a hardware item
  const handleHardwarePriceChange = (event, hardwareId) => {
    const price = parseFloat(event.target.value); // Convert string to number
    setSelectedHardwarePrices(prevPrices => ({
      ...prevPrices,
      [hardwareId]: isNaN(price) ? 0 : price // Store 0 if input is not a valid number
    }));
  };

  // Effect to calculate hardware bonus based on selected items and their prices
  useEffect(() => {
    let totalProfit = 0;
    Object.keys(selectedHardwarePrices).forEach(hardwareId => {
      const hardware = hardwareOptions.find(h => h.id === hardwareId);
      if (hardware) {
        const sellingPrice = selectedHardwarePrices[hardwareId];
        const profit = sellingPrice - hardware.cost;
        totalProfit += profit;
      }
    });
    setHardwareBonus(totalProfit * 0.30);
  }, [selectedHardwarePrices, hardwareOptions]);


  // --- Overall Total Bonus Calculation ---
  const totalProvisionBonus = subscriptionBonus + profitShareBonus + annualTransactionsBonus + hardwareBonus;


  return (
    <div className="App">
      <header className="App-header">
  <div className="logo-placeholder">
    {/* This is where your img tag should be */}
    <img src="/my-company-logo.png" alt="Company Logo" className="company-logo" />
  </div>
  <h1>LLPOS Swedbank Provision Model</h1>
</header>

      <div className="main-content">
        {/* Division 1: Subscription Selection */}
        <div className="division">
          <h2>1. Subscription Selection</h2>

          <div className="subscription-section">
            <h3>Main Subscriptions</h3>
            {availableMainSubscriptions.map(sub => (
              <div key={sub.id}>
                <input
                  type="checkbox"
                  id={`main-${sub.id}`}
                  value={sub.id}
                  onChange={handleMainSubscriptionChange}
                />
                <label htmlFor={`main-${sub.id}`}>{sub.name} ({sub.amount} DKK)</label>
              </div>
            ))}
          </div>

          <div className="subscription-section">
            <h3>Add-on Subscriptions</h3>
            {availableAddOnSubscriptions.map(sub => (
              <div key={sub.id}>
                <input
                  type="checkbox"
                  id={`add-on-${sub.id}`}
                  value={sub.id}
                  onChange={handleAddOnSubscriptionChange}
                />
                <label htmlFor={`add-on-${sub.id}`}>{sub.name} ({sub.amount} DKK)</label>
              </div>
            ))}
          </div>

          <div className="summary">
            <h3>Summary</h3>
            <p>Total Subscription Amount: {totalSubscriptionAmount} DKK</p>
            <p>Subscription Bonus: {subscriptionBonus} DKK</p>
          </div>
        </div>

        {/* Division 2: Profit Share Package */}
        <div className="division">
          <h2>2. Profit Share Package</h2>
          <div className="package-selection">
            {profitSharePackages.map(pkg => (
              <div key={pkg.id}>
                <input
                  type="radio"
                  id={`pkg-${pkg.id}`}
                  name="profitSharePackage"
                  value={pkg.id}
                  checked={selectedProfitSharePackage === pkg.id}
                  onChange={handleProfitSharePackageChange}
                />
                <label htmlFor={`pkg-${pkg.id}`}>{pkg.name}</label>
              </div>
            ))}
          </div>
          <div className="summary">
            <h3>Profit Share Bonus</h3>
            <p>Bonus: {profitShareBonus} DKK</p>
          </div>
        </div>

        {/* Division 3: Annual Transaction Factor */}
        <div className="division">
          <h2>3. Annual Transaction Factor</h2>
          <div className="transaction-selection">
            <label htmlFor="annualTransactions">Select Annual Transactions:</label>
            <select
              id="annualTransactions"
              value={selectedAnnualTransactions}
              onChange={handleAnnualTransactionsChange}
            >
              <option value="">-- Select an option --</option>
              {annualTransactionsOptions.map(option => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
          <div className="summary">
            <h3>Annual Transactions Bonus</h3>
            <p>Bonus: {annualTransactionsBonus} DKK</p>
          </div>
        </div>

        {/* Division 4: Hardware */}
        <div className="division">
          <h2>4. Hardware</h2>
          <div className="hardware-selection">
            {hardwareOptions.map(hardware => (
              <div key={hardware.id} className="hardware-item">
                <input
                  type="checkbox"
                  id={`hardware-${hardware.id}`}
                  value={hardware.id}
                  onChange={handleHardwareSelection}
                  checked={!!selectedHardwarePrices[hardware.id]} // Check if exists in selectedHardwarePrices
                />
                <label htmlFor={`hardware-${hardware.id}`}>
                  {hardware.name} (Cost: {hardware.cost} DKK)
                </label>
                {/* Conditionally render price input if hardware is selected */}
                {selectedHardwarePrices[hardware.id] !== undefined && (
                  <input
                    type="number"
                    min="0" // Assuming price cannot be negative when entered by agent
                    placeholder={`Recommended: ${hardware.cost} DKK`}
                    value={selectedHardwarePrices[hardware.id] || ''} // Display current price or empty string
                    onChange={(e) => handleHardwarePriceChange(e, hardware.id)}
                    className="hardware-price-input"
                  />
                )}
              </div>
            ))}
          </div>
          <div className="summary">
            <h3>Hardware Bonus</h3>
            <p>Bonus: {hardwareBonus.toFixed(2)} DKK</p> {/* toFixed(2) for better display of decimals */}
          </div>
        </div>
      </div> {/* End of main-content */}

      {/* Global Total Bonus Display */}
      <footer className="total-bonus-footer">
        <h2>Total Provision Bonus: {totalProvisionBonus.toFixed(2)} DKK</h2>
      </footer>
    </div>
  );
}

export default App;