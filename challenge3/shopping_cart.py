#!/usr/bin/env python3
"""
Shopping Cart Management System
A simple system to manage shopping carts for different users.
"""

import datetime
from typing import List, Dict, Any

class ShoppingCart:
    def __init__(self, user_id: str, items: List[Dict[str, Any]] = []):
        self.user_id = user_id
        self.items = items
        self.created_at = datetime.datetime.now()
    
    def add_item(self, name: str, price: float, quantity: int = 1):
        """Add an item to the shopping cart."""
        item = {
            'name': name,
            'price': price,
            'quantity': quantity,
            'added_at': datetime.datetime.now()
        }
        self.items.append(item)
    
    def get_total(self) -> float:
        """Calculate total price of all items in cart."""
        total = 0.0
        for item in self.items:
            total += item['price'] * item['quantity']
        return round(total, 2)
    
    def remove_item(self, item_name: str) -> bool:
        """Remove an item from the cart by name."""
        for i, item in enumerate(self.items):
            if item['name'] == item_name:
                del self.items[i]
                return True
        return False
    
    def get_item_count(self) -> int:
        """Get total number of items in cart."""
        return len(self.items)
    
    def __str__(self):
        return f"Cart for {self.user_id}: {self.get_item_count()} items, Total: ${self.get_total()}"

def create_user_cart(user_id: str) -> ShoppingCart:
    """Factory function to create a new shopping cart for a user."""
    return ShoppingCart(user_id)

def process_orders():
    """Simulate processing multiple user orders."""
    print("=== Shopping Cart System Demo ===\n")
    
    # Create carts for different users
    alice_cart = create_user_cart("alice")
    bob_cart = create_user_cart("bob")
    charlie_cart = create_user_cart("charlie")
    
    # Alice adds some items
    print("Alice's shopping:")
    alice_cart.add_item("Laptop", 999.99)
    alice_cart.add_item("Mouse", 29.99)
    print(f"  {alice_cart}")
    
    # Bob adds some items
    print("\nBob's shopping:")
    bob_cart.add_item("Book", 15.50)
    bob_cart.add_item("Pen", 2.99)
    print(f"  {bob_cart}")
    
    # Charlie adds some items
    print("\nCharlie's shopping:")
    charlie_cart.add_item("Coffee", 12.99)
    print(f"  {charlie_cart}")
    
    print("\n=== Final Cart Summary ===")
    print(f"Alice: {alice_cart}")
    print(f"Bob: {bob_cart}")
    print(f"Charlie: {charlie_cart}")

if __name__ == "__main__":
    process_orders()