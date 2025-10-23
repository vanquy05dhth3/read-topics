import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors()); // Cho phép mọi origin truy cập

// ⚙️ Cấu hình cookie cố định
const COOKIE_VALUE = "tst-vote=CfDJ8BWRpmd1pgZLr69dAYyNMLM_xMAl-EJl1H850J1MuC3rnVQg3717xtr-wvCRkUSNUP27EhYTbMqzWQb4TWi3nhguHN8Ex4InKCoNCJrt-N4iZBW7KoFUVoLMC6t_JfNWCi2mmQ8oxyhPm5-F1eopGfuWR0zXCAPqDBkTpENzWNjhcGVCx3mFounUBvZ5hOGnsfCIz9MilZfMl1HBJQOdhv3g3WRtU_MpzbKpAjPOevZxwEvyM5HyUlKp_NG03dgThEjQ8zsKrDBoz60HaYktDNHvpDL3nh9LG6sewPydbZQwPoWPRmhE2tMo2Lm6afJ5fD7psRW-iRzC_VManb7YYsy59N9lIUat_hUVBltbNHm6wwoZdZk9S5LgO5CiqU2YnjccPoKMxK2Mh9nd7CpKVdBm6WxNg58sehCIwEcMTKm6dLccJpkO_yrx5Y8NAJQGPTLV8C9BgtjxtBM9ILcEOnDTH9uDQvqT52cqXMVh6HlmKL5tdwZ_ghlyEnrCJtMLuFkvSl65dZNKk1iISWSqNBYqhbeE0GC5vZhJsiC8Cq369FzFuDMwGLabS8NO9HJq3AH6LqC52A9yyhIMciHVx3awFLtTykQOrC5JMl86uThn2FINmWhU3xlHwSxvnHRHwe4ZUD1jHiZwe4jRkNkrnfEUQ8n9w1W6Fh7ua2NUvTgopdwPSu9z_m_WHGH89pcrK2tJjcq4fufvaT38V-vv_4FrHcVuU_r34c1Du7rxxk-jcFSJRpo40_BINFSCocHm6dIxqM_avaEU9WunohPJK1uvnboFuHDjcgNIQltZBQxCOkwziPLZdDBbqi-zDgecBE5TCvgKOxm41eyTZQyiYzw"; // 👉 đổi cookie thật ở đây

app.get("/proxy/topics/:category/:page", async (req, res) => {
  const { category, page } = req.params;
  const url = `https://eureka-poster-2025-backend.khoahoctre.com.vn/api/-/topics/${category}/${page}`;

  try {
    const response = await fetch(url, {
      headers: {
        "accept": "*/*",
        "cookie": COOKIE_VALUE,
        "origin": "https://binhchon.khoahoctre.com.vn",
        "referer": "https://binhchon.khoahoctre.com.vn/",
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36",
      },
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("❌ Lỗi khi gọi API:", err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () =>
  console.log("🚀 Proxy server chạy tại http://localhost:3000")
);
