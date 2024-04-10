const Login = async (emailId, password) => {
    try {
        const response = await fetch("./users.json");
        if (!response.ok) {
            throw new Error("Failed to fetch user data");
        }
        const users = await response.json();
        const user = users.user.find(user => user.password === password && user.email === emailId);
        if (user) {
            return user;
        } else {
            throw new Error("Invalid email or password");
        }
    } catch (error) {
        throw new Error("Failed to login: " + error.message);
    }
};

document.getElementById("submitForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const password = document.querySelector("#password").value;
    const emailId = document.querySelector("#emailId").value;

    try {
        const user = await Login(emailId, password);
        console.log("User logged in:", user);
        window.location.href = "Task.html";
    } catch (error) {
        console.log("Login error:", error.message);
        alert(error.message);
    }
});
