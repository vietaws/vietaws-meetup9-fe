import React from 'react';
import styles from '../styles/form.module.css';

const SurveyForm = () => {
  return (
    <div>
      <h1>GeeksforGeeks Survey Form</h1>

      <form id="form">
        <div className={styles.formcontrol}>
          <label htmlFor="name" id="label-name">
            Name
          </label>

          <input type="text" id="name" placeholder="Enter your name" />
        </div>

        <div className={styles.formcontrol}>
          <label htmlFor="email" id="label-email">
            Email
          </label>

          <input type="email" id="email" placeholder="Enter your email" />
        </div>

        <div className={styles.formcontrol}>
          <label htmlFor="age" id="label-age">
            Age
          </label>

          <input type="text" id="age" placeholder="Enter your age" />
        </div>

        <div className={styles.formcontrol}>
          <label htmlFor="role" id="label-role">
            Which option best describes you?
          </label>

          <select name="role" id="role">
            <option value="student">Student</option>
            <option value="intern">Intern</option>
            <option value="professional">Professional</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className={styles.formcontrol}>
          <label>Would you recommend GeeksforGeeks to a friend?</label>
          <label htmlFor="recommed-1">
            <input type="radio" id="recommed-1" name="recommed" />
            Yes
          </label>
          <label htmlFor="recommed-2">
            <input type="radio" id="recommed-2" name="recommed" />
            No
          </label>
          <label htmlFor="recommed-3">
            <input type="radio" id="recommed-3" name="recommed" />
            Maybe
          </label>
        </div>

        <div className={styles.formcontrol}>
          <label>
            Languages and Frameworks known
            <small>(Check all that apply)</small>
          </label>
          <label htmlFor="inp-1">
            <input type="checkbox" name="inp" />C
          </label>
          <label htmlFor="inp-2">
            <input type="checkbox" name="inp" />
            C++
          </label>
          <label htmlFor="inp-3">
            <input type="checkbox" name="inp" />
            C#
          </label>
          <label htmlFor="inp-4">
            <input type="checkbox" name="inp" />
            Java
          </label>
          <label htmlFor="inp-5">
            <input type="checkbox" name="inp" />
            Python
          </label>
        </div>

        <div className={styles.formcontrol}>
          <label htmlFor="comment">Any comments or suggestions</label>

          <textarea
            name="comment"
            id="comment"
            placeholder="Enter your comment here"
          ></textarea>
        </div>

        <button type="submit" value="submit" className={styles.btn}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default SurveyForm;
