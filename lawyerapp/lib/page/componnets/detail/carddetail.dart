import 'package:flutter/material.dart';

class CardDetail extends StatelessWidget {
  final double balance;
  final int cardNumber;
  final int expiredMonth;
  final int expiredYear;
  final String cardType;
  final String Balance;
  final color;

  const CardDetail(
      {super.key,
      required this.balance,
      required this.cardNumber,
      required this.expiredMonth,
      required this.expiredYear,
      required this.color,
      required this.cardType,
      required this.Balance});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 25),
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
                  Balance,
                  style: TextStyle(
                    color: Colors.black,
                    fontSize: 20,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ],
            ),
            const SizedBox(height: 10),
            Text(
              "รายละเอียด",
              style: TextStyle(
                color: Colors.black,
                fontSize: 12,
                fontWeight: FontWeight.bold,
              ),
            ),
            const SizedBox(height: 30),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  "ค่าใช้จ่าย",
                  style: TextStyle(
                    color: Colors.black,
                  ),
                ),
                Text(
                  "500 บาท",
                  style: TextStyle(
                    color: Colors.black,
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
