import { MongoClient } from "mongodb"; // MongoDB 클라이언트 가져오기

async function handler(req, res) {
  if (req.method === "POST") {
    const { email, name, message } = req.body;

    // 서버 사이드 유효성 검사
    if (
      !email ||
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !message ||
      message.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid Input" });
      return;
    }

    const newMessage = {
      email,
      name,
      message,
    };

    let client;

    try {
      // 환경변수에서 MongoDB URI 읽고 연결
      client = await MongoClient.connect(process.env.MONGODB_URI);
    } catch (error) {
      res.status(500).json({ message: "Could not connect Database." });
      return;
    }

    const db = client.db(); // 기본 데이터베이스 가져오기

    try {
      // 메시지를 'messages' 컬렉션에 저장
      const result = await db.collection("messages").insertOne(newMessage);
      newMessage.id = result.insertedId; // 응답에 ID 포함
    } catch (error) {
      client.close();
      res.status(500).json({ message: "Storing message failed!" });
      return;
    }

    client.close(); // 연결 종료

    // 성공 응답 반환
    res
      .status(201)
      .json({ message: "Succeesfully stored Newmessage", message: newMessage });
  }
}

export default handler;
