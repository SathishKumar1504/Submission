//using System;
//using System.IO;
//using System.Security.Cryptography;

//class GenerateKeys
//{
//    static void Main()
//    {
//        string folderPath = ("D:/C# Training/Project/Submission/BankCustomerAPI/BankCustomerAPI/Keys");

//        // Create folder if it doesn't exist
//        if (!Directory.Exists(folderPath))
//            Directory.CreateDirectory(folderPath);

//        // Create RSA key pair (2048 bits)
//        using var rsa = RSA.Create(2048);

//        // Export keys in PEM format
//        string publicKeyPem = rsa.ExportSubjectPublicKeyInfoPem();
//        string privateKeyPem = rsa.ExportRSAPrivateKeyPem();

//        // Save to files
//        File.WriteAllText(Path.Combine(folderPath, "public.pem"), publicKeyPem);
//        File.WriteAllText(Path.Combine(folderPath, "private.pem"), privateKeyPem);

//        Console.WriteLine("✅ RSA Keys generated successfully!");
//        Console.WriteLine($"📂 Location: {folderPath}");
//    }
//}
