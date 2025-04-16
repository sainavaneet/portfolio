# Contact Me

<!-- Inline styling and form HTML below -->

<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet">

<style>


.contact-form {
  font-family: 'Roboto', sans-serif;
  background-color: #ffffff; /* White background for light theme */
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  max-width: 700px;
  margin: 2rem auto;
  transition: transform 0.3s, box-shadow 0.3s, background-color 0.3s;
  border: 1px solid #eaeaea; /* Light border */
  color: #333;
}

.contact-form:hover {
  transform: translateY(-6px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
}

.contact-form h2 {
  margin-top: 0;
  color: #333;
  text-align: center;
  position: relative;
  font-size: 1.75rem;
}

.contact-form h2::after {
  content: '';
  width: 80px;
  height: 4px;
  background: linear-gradient(90deg, #007bff, #0056b3);
  position: absolute;
  bottom: -15px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 5px;
}

.contact-form label {
  display: block;
  margin-bottom: 8px;
  color: #555;
  font-weight: 600;
  font-size: 0.95rem;
}

.contact-form .input-group {
  margin-bottom: 1.5rem;
}

.contact-form input,
.contact-form textarea {
  width: 100%;
  padding: 0.9rem 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  font-family: inherit;
  transition: border-color 0.3s, box-shadow 0.3s, background-color 0.3s, color 0.3s;
  background-color: #fff;
  color: #333;
  box-sizing: border-box;
}

.contact-form input:focus,
.contact-form textarea:focus {
  border-color: #007bff; /* Match the gradient start color */
  outline: none;
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.2); /* Match the gradient start color */
}

.contact-form button {
  width: 100%;
  padding: 1rem;
  background: linear-gradient(90deg, #007bff, #0056b3);
  border: none;
  border-radius: 8px;
  color: #fff;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s, transform 0.2s;
}

.contact-form button:hover {
  background: linear-gradient(90deg, #0056b3, #004085);
  transform: scale(1.02);
}

/* 🌙 DARK MODE SUPPORT */
@media (prefers-color-scheme: dark) {
  .contact-form {
    background-color: #1e1e1e;
    border: 1px solid #333;
    color: #f0f0f0;
  }

  .contact-form h2,
  .contact-form label {
    color: #f0f0f0;
  }

  .contact-form input,
  .contact-form textarea {
    background-color: #2c2c2c;
    color: #f0f0f0;
    border: 1px solid #555;
  }

  .contact-form input:focus,
  .contact-form textarea:focus {
    border-color: #3399ff;
    box-shadow: 0 0 0 2px rgba(51, 153, 255, 0.3);
  }
}



</style>

<form action="https://formspree.io/f/xanedwyo" method="post" class="contact-form">
  <h2>Get in Touch</h2>
  <div class="input-group">
    <label for="name">Your Name:</label>
    <input type="text" id="name" name="name" required>
  </div>
  <div class="input-group">
    <label for="email">Your Email:</label>
    <input type="email" id="email" name="email" required>
  </div>
  <div class="input-group">
    <label for="message">Message:</label>
    <textarea id="message" name="message" rows="5" required></textarea>
  </div>
  <button type="submit">Send Message</button>
</form>
