# 🔒 Chaotic Password Generator

*A unique password generator that leverages the physics of a double pendulum to create a source of chaotic entropy.*

<br>

<div style="text-align: center;">
  ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
  ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
  ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
</div>

<br>

<p align="center">
  <img src="demo.gif" alt="Chaotic Password Generator Demo" width="80%">
</p>

## 📖 About The Project

This project explores a non-traditional method of generating random data. Instead of relying on standard pseudo-random number generators (`Math.random()`), it uses the state variables (angles and angular velocities) of a simulated double pendulum—a classic example of a chaotic system in physics.

The core idea is that even a minuscule, imperceptible change in the starting conditions of a double pendulum leads to wildly different, unpredictable long-term behavior. This sensitivity makes it a fascinating source of entropy for generating passwords.

> **Note:** This is an exploratory project demonstrating a concept. It is not intended to be a cryptographically secure random number generator for production use.

---

## ✨ Key Features

* **Live Physics Simulation:** A visually engaging double pendulum simulation running in real-time.
* **Chaotic Entropy Source:** Uses the pendulum's state at the moment of generation as the seed for the password.
* **Customizable Output:**
    * Adjust password length from 8 to 32 characters.
    * Toggle the inclusion of numbers and symbols.
* **Click-to-Copy:** Easily copy the generated password to your clipboard.
* **Responsive Design:** The simulation and controls adapt to different screen sizes.

---

## 🚀 The Concept: Chaos as Entropy

How does it work?

1.  **The Simulation:** Two pendulums are started with nearly identical initial conditions (a difference of only `0.00001` radians).
2.  **Chaotic Motion:** Due to the nature of the system, their paths diverge dramatically and unpredictably over time.
3.  **Capture State:** When the "Generate Password" button is clicked, the application captures a snapshot of the exact angular position and velocity of one of the pendulums.
4.  **Create Entropy Pool:** These floating-point numbers are concatenated into a long string of digits.
5.  **Build Password:** The entropy string is then used to select characters from a defined character set, building a password that is a direct result of the pendulum's chaotic state at that precise moment.

---

## 🛠️ Built With

This project was built using vanilla web technologies, with no external frameworks.

* **HTML5**
* **CSS3**
* **JavaScript (ES6+)** with the HTML Canvas API for the simulation.

---

## 🏁 Getting Started

To get a local copy up and running, simply follow these steps.

### Installation

1.  Clone the repository:
    ```sh
    git clone [https://github.com/](https://github.com/)[YOUR_GITHUB_USERNAME]/chaotic-password-generator.git
    ```
2.  Navigate into the project directory:
    ```sh
    cd chaotic-password-generator
    ```
3.  Open the `index.html` file in your browser.

---

## Usage

1.  Let the simulation run for a few seconds to build up chaotic motion.
2.  Use the slider to select your desired password length.
3.  Check or uncheck the boxes to include numbers and/or symbols.
4.  Click the **"Generate Password"** button.
5.  Click the password text box to copy the generated password to your clipboard.
6.  Click **"Reset Simulation"** to restart the pendulums from their initial state.

---

## 📜 License

All Rights Reserved. © [Year] [Your Full Name]

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby denied.

*See the `LICENSE` file for more details if you choose to add one.*

---

## 📬 Contact

Diego Natanael - [Your Portfolio Website Link] - [your.email@example.com]

Project Link: [https://github.com/[YOUR_GITHUB_USERNAME]/chaotic-password-generator](https://github.com/[YOUR_GITHUB_USERNAME]/chaotic-password-generator)
