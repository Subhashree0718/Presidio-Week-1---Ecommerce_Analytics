# E-Commerce Analytics & Recommendation Platform

## Project Overview
This project is an **E-Commerce Analytics & Recommendation Platform** designed to process product and user activity data, provide actionable insights, and demonstrate scalable system design.  

It integrates **Week 1 core concepts**: HashMaps, Recursion, SQL Joins / Indexing / Transactions, and System Design. Additional improvements include caching, fault tolerance, and GitHub-based feature workflow.

---

## Features

### 1️⃣ Data Processing Engine (HashMap + Recursion)

**Trending Products**  
- Track real-time product purchase frequencies using HashMaps.  
- Identify top trending products dynamically.  

**Recommendations**  
- Suggest top 3 co-purchased products with >30% co-occurrence rate.  
- Supports better customer upselling and engagement.  

**Category Analysis**  
- Recursively parse nested categories to compute total sales and engagement scores.  
- Identify hot subcategories or viral products using recursive aggregation.  
- Optional memoization for repeated calculations to enhance performance.

---

### 2️⃣ Database Layer (SQL Joins + Indexing + Transactions)

**SQL Joins**  
- Generate top-selling products by category.  
- Identify most active customers by purchase count.  
- Compute revenue contribution per category.  

**Indexing**  
- `Products(name)` index for fast trending searches.  
- `Category(parent_id)` index for efficient recursive queries.  

**Transactions**  
- Atomic operations for placing orders, updating stock, and tracking purchase history.  
- Ensures data consistency during complex operations.

---

### 3️⃣ System Design Implementation (Optional)

**Caching Strategy**  
- Cache trending products and recommended products for faster access.  

**Fault Tolerance**  
- Retry mechanisms for failed order processing or analytics computation.  
- Handles simulated high-frequency order placements.

---

### 4️⃣ GitHub Collaboration Workflow

- Use feature branches for each module:
  - `feature/trending-products`  
  - `feature/recommendation-engine`  
  - `feature/category-analysis`  
  - `feature/top-users`  
  - `feature/place-order`  
- Atomic commits with descriptive messages.  
- Conduct Pull Request (PR) reviews before merging.

---

## **Project Structure**

```text
ecommerce-analytics/
├─ models/          # Data models: User, Product, Category, Order, OrderItem
├─ services/        # Analytics & Order services
├─ utils/           # Database connection, caching
├─ index.js         # Driver function for testing
├─ package.json
└─ README.md
```
##  Key Deliverables

### GitHub Repository
- Clean commit history
- PR-reviewed code
- Well-documented README

### Working Application
- Trending products
- Recommended products
- Recursive category sales analytics

### Demo
- Live product trends and recommendations
- Recursive category analytics
---

## Key Learnings

✅ **HashMaps** for real-time product tracking and recommendations.  
✅ **Recursion** for nested category analytics.  
✅ **SQL joins, indexing, and transactions** for database-level insights.  
✅ Optional **system design improvements** for caching and fault tolerance.

