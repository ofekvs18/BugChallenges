# 🛒 Challenge 1: The Phantom Shopping Cart 👻

## **🐛 Overview**
Welcome to the first debugging challenge! You've been given a Python shopping cart management system that **should** work perfectly for managing multiple customer orders. But something sinister is lurking in the code, causing items to mysteriously appear in the wrong shopping carts! 🕵️‍♀️

## **🎭 The Situation**
The e-commerce team deployed this "enterprise-grade" shopping cart system last week. During testing, everything looked great - clean code, proper type hints, professional structure. But when real customers started using it, chaos ensued! 

Customers are complaining that:
- Alice's laptop keeps appearing in Bob's cart! 💻➡️👨
- Charlie somehow has everyone's items without adding them! 🤷‍♂️
- Items are multiplying like rabbits across different user sessions 🐰
- The customer service team is going insane trying to explain this "quantum shopping" phenomenon 🤯

The development team is baffled - the code looks absolutely perfect! They need your debugging superpowers to solve this mystery.

## **🎯 Your Mission**
1. **🔍 Identify** what's causing items to appear in multiple shopping carts
2. **🧠 Diagnose** the root cause of this spooky behavior  
3. **🔧 Fix** the problem with the most appropriate solution
4. **✅ Verify** that each customer's cart remains private and isolated

## **🚀 Getting Started**

### **📋 Prerequisites**
* Python 3.7+ installed
* Basic familiarity with Python classes and objects
* A detective mindset 🔍

### **⚡ Setup Instructions**
1. Save the provided code as `shopping_cart.py`
2. Run the application:
   ```bash
   python shopping_cart.py
   ```
3. Observe the mysterious behavior in the output! 👀

## **🎉 What You Should See (When Fixed)**
Once you've successfully banished the shopping cart ghost, you should see:
* ✅ Alice's cart contains only Alice's items
* ✅ Bob's cart contains only Bob's items  
* ✅ Charlie's cart contains only Charlie's items
* ✅ No mysterious item sharing between customers
* ✅ Each cart maintains its own independent state

## **🛍️ Application Features**
The shopping cart system includes:
* **👤 User Management**: Individual shopping carts per customer
* **🛒 Item Management**: Add/remove items with prices and quantities
* **💰 Price Calculation**: Automatic total calculation with tax
* **📊 Inventory Tracking**: Real-time item count per cart
* **🏭 Factory Pattern**: Professional cart creation system

## **🔧 Debugging Tips**
* 🧐 Pay attention to which items appear in which carts
* 📝 Trace the execution flow - when are objects created?
* 🔍 Look closely at constructor parameters and default values
* 🤔 Consider object sharing vs. object creation
* 🐍 Remember Python's quirky behavior with mutable defaults!
* ⚠️ Don't trust appearances - type hints can be deceiving!

## **🏆 Success Criteria**
You've conquered the challenge when:
* 🎯 Each customer's cart is completely isolated
* 🚫 No items leak between different shopping carts
* ✨ The output shows proper item ownership
* 🧪 Multiple test runs produce consistent results
* 📚 You understand WHY the bug occurred

## **💡 Hints (Use Only If Stuck)**

<details>
<summary>🟡 Hint 1 (Gentle Nudge)</summary>
Look at the ShoppingCart constructor. What happens when you don't pass the `items` parameter? 🤔
</details>

<details>
<summary>🟠 Hint 2 (Warmer)</summary>
Python evaluates default arguments only once - when the function is defined, not when it's called! What does this mean for mutable objects like lists? 📝
</details>

## **📊 Evaluation**
Your solution will be evaluated on:
* **🎯 Correctness**: Does each cart work independently?
* **🔬 Understanding**: Do you grasp the root cause?
* **⚡ Efficiency**: How quickly did you spot the issue?
* **🏗️ Best Practices**: Is your fix robust and maintainable?

## **🤔 Questions to Consider**
* What makes this bug particularly sneaky? 🕵️
* Why do type hints make the bug harder to spot? 🎭
* How would you prevent this in code reviews? 👥
* What Python linting tools could catch this? 🛠️
* When else might you encounter similar issues? 🔄

## **⏱️ Time Estimate**
**Expected completion time: 10-25 minutes** ⏰

*Note: Don't feel bad if it takes longer - this is a classic Python gotcha that trips up even experienced developers!* 😅

---

**Good luck debugging, shopping cart detective! May your carts stay separate and your items stay put!** 🛒🔍✨