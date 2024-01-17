import 'package:flutter/material.dart';

class MyCard extends StatelessWidget {
  final double balance;
  final int cardNumber;
  final int expiredMonth;
  final int expiredYear;
  final String cardType;
  final color;

  const MyCard({
    super.key,
    required this.balance,
    required this.cardNumber,
    required this.expiredMonth,
    required this.expiredYear,
    required this.color,
    required this.cardType,
  });

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 10),
      child: Container(
        height: 150,
        padding: EdgeInsets.all(20),
        decoration: BoxDecoration(
          color: color,
          borderRadius: BorderRadius.circular(16),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  "Balance",
                  style: TextStyle(color: Colors.white, fontSize: 28),
                ),
              ],
            ),
            const SizedBox(height: 10),
            Text(
              '\$' + balance.toString(),
              style: TextStyle(
                color: Colors.white,
                fontSize: 28,
                fontWeight: FontWeight.bold,
              ),
            ),
            const SizedBox(height: 30),
          ],
        ),
      ),
    );
  }
}
