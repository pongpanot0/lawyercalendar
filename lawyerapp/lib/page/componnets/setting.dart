import 'package:flutter/material.dart';
import 'package:lawyerapp/page/Mainscreen.dart';
import 'package:lawyerapp/page/componnets/Apiservice.dart';
import 'package:lawyerapp/page/login.dart';
import 'package:lawyerapp/themes.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:image_picker/image_picker.dart';

class SettingPage extends StatefulWidget {
  const SettingPage({super.key});

  @override
  State<SettingPage> createState() => _SettingPageState();
}

class _SettingPageState extends State<SettingPage> {
  Future<void> clearToken() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    await prefs.remove('token');
    print('Token cleared.');
  }

  late MyTheme myTheme;
  @override
  void initState() {
    super.initState();
    myTheme = Theme1(); // หรือใช้ธีมเริ่มต้นที่คุณต้องการ
    _loadCurrentTheme();
    getProfile();
  }

  late List<dynamic> ProfileData; // <-- Change the type here
  Future<dynamic> getProfile() async {
    try {
      final apiService = ApiService();
      dynamic profileData =
          await apiService.getProfile(); // Call your API function
      await Future.delayed(Duration(seconds: 1));
      return profileData;
    } catch (e) {
      // Handle errors
      print('Error: $e');
      throw e; // Rethrow the error to handle it in the caller
    }
  }

  _loadCurrentTheme() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    String? themeName = prefs.getString('current_theme');
    setState(() {
      if (themeName == 'theme1') {
        myTheme = Theme1();
      } else if (themeName == 'theme2') {
        myTheme = Theme2();
      } else {
        myTheme = Theme3();
      }
    });
  }

  _switchTheme(MyTheme newTheme) async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    setState(() {
      myTheme = newTheme;
      if (newTheme is Theme1) {
        prefs.setString('current_theme', 'theme1');
      } else if (newTheme is Theme2) {
        prefs.setString('current_theme', 'theme2');
      } else if (newTheme is Theme3) {
        prefs.setString('current_theme', 'theme3');
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        decoration: BoxDecoration(
          image: DecorationImage(
            scale: 1.7,
            alignment: Alignment.center,
            opacity: 0.1,
            image: AssetImage(
              'images/newbackground.png',
            ), // Replace with your image URL
            fit: BoxFit.contain,
          ),
        ),
        child: Stack(
          children: [
            FutureBuilder(
                future: getProfile(),
                builder: (context, snapshot) {
                  print(snapshot);
                  if (snapshot.connectionState == ConnectionState.waiting) {
                    return Center(
                      child: CircularProgressIndicator(),
                    );
                  } else if (snapshot.hasError) {
                    return Center(
                      child: Text('Error: ${snapshot.error}'),
                    );
                  } else {
                    var dataArray = snapshot.data as List<dynamic>;
                    print(dataArray);
                    return Positioned(
                      top: MediaQuery.of(context).size.height / 2 -
                          350.0, // Adjust as needed
                      left: MediaQuery.of(context).size.width / 2 -
                          180.0, // Adjust as needed
                      child: Column(
                        children: [
                          Container(
                            decoration: BoxDecoration(
                              shape: BoxShape.circle,
                              border: Border.all(
                                color: Colors.amber
                                    .shade200, // Set the border color for the CircleAvatar
                                width:
                                    2.0, // Set the border width for the CircleAvatar
                              ),
                            ),
                            child: GestureDetector(
                              onTap: () {
                                _pickImageFromGallery(); // Call the method to pick an image from the gallery
                              },
                              child: CircleAvatar(
                                radius: 100.0,
                                backgroundImage: dataArray[0]['employee_pic'] !=
                                        null
                                    ? NetworkImage(dataArray[0]['employee_pic'])
                                    : NetworkImage(
                                        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSN9lZxcVeTkoj27911KSV__OmKqgFRYhMTUw&usqp=CAUg',
                                      ),
                              ),
                            ),
                          ),
                          SizedBox(
                            height: 10,
                          ),
                          GestureDetector(
                            onTap: () {
                              _showColorInfo();
                            },
                            child: Container(
                                height: 70,
                                width: MediaQuery.of(context).size.width / 1.1,
                                padding: EdgeInsets.all(20),
                                decoration: BoxDecoration(
                                  color: myTheme.cardColors,
                                  borderRadius: BorderRadius.circular(16),
                                ),
                                child: Column(
                                  children: [
                                    Row(
                                      mainAxisAlignment:
                                          MainAxisAlignment.spaceBetween,
                                      children: [
                                        Text("เลือกธีม",
                                            style: TextStyle(
                                                fontSize: 18,
                                                color: myTheme.cardfontColors)),
                                      ],
                                    ),
                                  ],
                                )),
                          ),
                          SizedBox(
                            height: 10,
                          ),
                          Container(
                              height: 100,
                              width: MediaQuery.of(context).size.width / 1.1,
                              padding: EdgeInsets.all(20),
                              decoration: BoxDecoration(
                                color: myTheme.cardColors,
                                borderRadius: BorderRadius.circular(16),
                              ),
                              child: Column(
                                children: [
                                  Row(
                                    mainAxisAlignment:
                                        MainAxisAlignment.spaceBetween,
                                    children: [
                                      Text(
                                          "${dataArray[0]['employee_firstname']} ${dataArray[0]['employee_lastname']}",
                                          style: TextStyle(
                                              fontSize: 18,
                                              color: myTheme.cardfontColors)),
                                    ],
                                  ),
                                  SizedBox(
                                    height: 5,
                                  ),
                                  Row(
                                    mainAxisAlignment:
                                        MainAxisAlignment.spaceBetween,
                                    children: [
                                      Text("${dataArray[0]['employee_email']}",
                                          style: TextStyle(
                                              fontSize: 18,
                                              color: myTheme.cardfontColors)),
                                    ],
                                  ),
                                ],
                              )),
                          SizedBox(
                            height: 20,
                          ),
                          Container(
                              height: 70,
                              width: MediaQuery.of(context).size.width / 1.1,
                              padding: EdgeInsets.all(20),
                              decoration: BoxDecoration(
                                color: myTheme.cardColors,
                                borderRadius: BorderRadius.circular(16),
                              ),
                              child: Column(
                                children: [
                                  InkWell(
                                    onTap: () {
                                      clearToken();
                                      Navigator.pushReplacement(
                                        context,
                                        MaterialPageRoute(
                                            builder: (context) => LoginPage()),
                                      );
                                    },
                                    child: Row(
                                      mainAxisAlignment:
                                          MainAxisAlignment.spaceBetween,
                                      children: [
                                        Text(
                                          "LogOut",
                                          style: TextStyle(
                                              fontSize: 18,
                                              color: myTheme.cardfontColors),
                                        ),
                                        Icon(
                                          Icons.logout_outlined,
                                          color: myTheme.cardfontColors,
                                        )
                                      ],
                                    ),
                                  ),
                                ],
                              )),
                          SizedBox(
                            height: 20,
                          ),
                          Container(
                              height: 70,
                              width: MediaQuery.of(context).size.width / 1.1,
                              padding: EdgeInsets.all(20),
                              decoration: BoxDecoration(
                                color: myTheme.danger,
                                borderRadius: BorderRadius.circular(16),
                              ),
                              child: Column(
                                children: [
                                  Row(
                                    mainAxisAlignment:
                                        MainAxisAlignment.spaceBetween,
                                    children: [
                                      Text(
                                        "Delete Account",
                                        style: TextStyle(
                                            fontSize: 18,
                                            color: myTheme.fontColors),
                                      ),
                                      Icon(
                                        Icons.delete_sweep_outlined,
                                        size: 30,
                                        color: myTheme.fontColors,
                                      )
                                    ],
                                  ),
                                ],
                              )),
                        ],
                      ),
                    );
                  }
                }),
            // Centered Circular Image
          ],
        ),
      ),
    );
  }

  _showColorInfo() {
    showModalBottomSheet(
      context: context,
      builder: (BuildContext context) {
        return Container(
          height: MediaQuery.of(context).size.height,
          padding: EdgeInsets.all(16.0),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: <Widget>[
              Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text("Theme1"),
                  GestureDetector(
                    onTap: () => _switchTheme(Theme1()),
                    child: Card(
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                        children: [
                          Container(
                            width: 50,
                            height: 50,
                            decoration: BoxDecoration(
                                shape: BoxShape.circle,
                                color: Theme1().cardColors,
                                border:
                                    Border.all(color: Colors.black, width: 1)),
                            child: myTheme == Theme1()
                                ? Icon(Icons.check, color: Colors.white)
                                : null,
                          ),
                          Container(
                            width: 50,
                            height: 50,
                            decoration: BoxDecoration(
                                shape: BoxShape.circle,
                                color: Theme1().cardTabColors,
                                border:
                                    Border.all(color: Colors.black, width: 1)),
                            child: myTheme == Theme1()
                                ? Icon(Icons.check, color: Colors.white)
                                : null,
                          ),
                          Container(
                            width: 50,
                            height: 50,
                            decoration: BoxDecoration(
                                shape: BoxShape.circle,
                                color: Theme1().activeColors,
                                border:
                                    Border.all(color: Colors.black, width: 1)),
                            child: myTheme == Theme1()
                                ? Icon(Icons.check, color: Colors.white)
                                : null,
                          ),
                          Container(
                            width: 50,
                            height: 50,
                            decoration: BoxDecoration(
                                shape: BoxShape.circle,
                                color: Theme1().bottomColor,
                                border:
                                    Border.all(color: Colors.black, width: 1)),
                            child: myTheme == Theme1()
                                ? Icon(Icons.check, color: Colors.white)
                                : null,
                          ),
                        ],
                      ),
                    ),
                  ),
                  SizedBox(width: 20),
                  Text("Theme2"),
                  GestureDetector(
                    onTap: () => _switchTheme(Theme2()),
                    child: Card(
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                        children: [
                          Container(
                            width: 50,
                            height: 50,
                            decoration: BoxDecoration(
                                shape: BoxShape.circle,
                                color: Theme2().cardColors,
                                border:
                                    Border.all(color: Colors.black, width: 1)),
                            child: myTheme == Theme2()
                                ? Icon(Icons.check, color: Colors.white)
                                : null,
                          ),
                          Container(
                            width: 50,
                            height: 50,
                            decoration: BoxDecoration(
                                shape: BoxShape.circle,
                                color: Theme2().cardTabColors,
                                border:
                                    Border.all(color: Colors.black, width: 1)),
                            child: myTheme == Theme2()
                                ? Icon(Icons.check, color: Colors.white)
                                : null,
                          ),
                          Container(
                            width: 50,
                            height: 50,
                            decoration: BoxDecoration(
                                shape: BoxShape.circle,
                                color: Theme2().activeColors,
                                border:
                                    Border.all(color: Colors.black, width: 1)),
                            child: myTheme == Theme2()
                                ? Icon(Icons.check, color: Colors.white)
                                : null,
                          ),
                          Container(
                            width: 50,
                            height: 50,
                            decoration: BoxDecoration(
                                shape: BoxShape.circle,
                                color: Theme2().bottomColor,
                                border:
                                    Border.all(color: Colors.black, width: 1)),
                            child: myTheme == Theme2()
                                ? Icon(Icons.check, color: Colors.white)
                                : null,
                          ),
                        ],
                      ),
                    ),
                  ),
                  SizedBox(width: 20),
                  Text("Theme3"),
                  GestureDetector(
                    onTap: () => _switchTheme(Theme3()),
                    child: Card(
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                        children: [
                          Container(
                            width: 50,
                            height: 50,
                            decoration: BoxDecoration(
                                shape: BoxShape.circle,
                                color: Theme3().cardColors,
                                border:
                                    Border.all(color: Colors.black, width: 1)),
                            child: myTheme == Theme3()
                                ? Icon(Icons.check, color: Colors.white)
                                : null,
                          ),
                          Container(
                            width: 50,
                            height: 50,
                            decoration: BoxDecoration(
                                shape: BoxShape.circle,
                                color: Theme3().cardTabColors,
                                border:
                                    Border.all(color: Colors.black, width: 1)),
                            child: myTheme == Theme3()
                                ? Icon(Icons.check, color: Colors.white)
                                : null,
                          ),
                          Container(
                            width: 50,
                            height: 50,
                            decoration: BoxDecoration(
                                shape: BoxShape.circle,
                                color: Theme3().activeColors,
                                border:
                                    Border.all(color: Colors.black, width: 1)),
                            child: myTheme == Theme3()
                                ? Icon(Icons.check, color: Colors.white)
                                : null,
                          ),
                          Container(
                            width: 50,
                            height: 50,
                            decoration: BoxDecoration(
                                shape: BoxShape.circle,
                                color: Theme3().bottomColor,
                                border:
                                    Border.all(color: Colors.black, width: 1)),
                            child: myTheme == Theme3()
                                ? Icon(Icons.check, color: Colors.white)
                                : null,
                          ),
                        ],
                      ),
                    ),
                  ),
                ],
              ),
              SizedBox(height: 16.0),
              ElevatedButton(
                onPressed: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) =>
                          Mainscreen(data: 'update', screen: 3),
                    ),
                  );
                },
                child: Text('Close'),
              ),
            ],
          ),
        );
      },
    );
  }

  void _pickImageFromGallery() async {
    final picker = ImagePicker();
    final image = await ImagePicker().pickImage(source: ImageSource.gallery);
    if (image != null) {
      // Handle the picked image file, for example, you can display it
      // You can use File(pickedFile.path) to get the file path
      // For simplicity, we just print the file path here
      print('Image picked: ${image.path}');
    } else {
      print('No image selected.');
    }
  }
}
