import React, { useState } from 'react';
import styles from './SurveyForm.module.css';
import { API, Auth } from 'aws-amplify';
import { useDispatch } from 'react-redux';
import { surveyActions } from '../store/survey-slice';

const SurveyForm = (props) => {
  const [overall, setOverall] = useState(5);
  const [timeSurvey, setTimeSurvey] = useState(5);
  const [speakerScore, setSpeakerScore] = useState(5);
  const [mostLike, setMostLike] = useState('N/A');
  const [recommendation, setRecommendation] = useState('N/A');
  const dispatch = useDispatch();
  const formHandler = async (e) => {
    e.preventDefault();
    const user = await Auth.currentAuthenticatedUser();
    const submitData = {
      email: user.attributes.email,
      name: user.attributes.name,
      overall: parseInt(overall),
      duration: parseInt(timeSurvey),
      speakerScore: parseInt(speakerScore),
      mostLike: mostLike,
      recommend: recommendation,
    };
    console.log('request data: ', submitData);
    const idToken = user.signInUserSession.idToken.jwtToken;
    console.log('idToken: ', idToken);
    const requestMsg = {
      headers: {
        Authorization: idToken,
      },
      body: submitData,
    };
    const res = await API.post(
      'survey-vietaws-event-apigw',
      '/questions',
      requestMsg
    );
    console.log('Response Message: ', res);
    dispatch(surveyActions.setSubmittedSurveyStatus());
    const surveyScanned = await API.get(
      'survey-vietaws-event-apigw',
      '/questions',
      requestMsg
    );
    console.log('all survey:', surveyScanned);
  };
  return (
    <div>
      <h3>We evaluated your feedbacks!</h3>

      <form id="form">
        <div className={styles.formcontrol}>
          <label>1. Mức Độ Hài Lòng về sự kiện?</label>
          <label htmlFor="recommed-1">
            <input
              type="radio"
              id="recommed-1"
              name="recommed"
              value="5"
              onChange={(e) => setOverall(e.target.value)}
            />
            Rất Hài Lòng
          </label>
          <label htmlFor="recommed-2">
            <input
              type="radio"
              id="recommed-2"
              name="recommed"
              value="4"
              onChange={(e) => setOverall(e.target.value)}
            />
            Hài Lòng
          </label>
          <label htmlFor="recommed-3">
            <input
              type="radio"
              id="recommed-3"
              name="recommed"
              value="3"
              onChange={(e) => setOverall(e.target.value)}
            />
            Bình Thường
          </label>
          <label htmlFor="recommed-4">
            <input
              type="radio"
              id="recommed-4"
              name="recommed"
              value="2"
              onChange={(e) => setOverall(e.target.value)}
            />
            Không Hài Lòng
          </label>
          <label htmlFor="recommed-5">
            <input
              type="radio"
              id="recommed-5"
              name="recommed"
              value="1"
              onChange={(e) => setOverall(e.target.value)}
            />
            Rất Không Hài Lòng
          </label>
        </div>

        {/* Question 2 */}
        <div className={styles.formcontrol}>
          <label>2. Thời lượng chương trình?</label>
          <label htmlFor="time-1">
            <input
              type="radio"
              id="time-1"
              name="eventDuration"
              value="3"
              onChange={(e) => setTimeSurvey(e.target.value)}
            />
            Vừa phải
          </label>
          <label htmlFor="time-2">
            <input
              type="radio"
              id="time-2"
              name="eventDuration"
              value="2"
              onChange={(e) => setTimeSurvey(e.target.value)}
            />
            Hơi Dài
          </label>
          <label htmlFor="time-3">
            <input
              type="radio"
              id="time-3"
              name="eventDuration"
              value="1"
              onChange={(e) => setTimeSurvey(e.target.value)}
            />
            Hơi ngắn
          </label>
        </div>
        {/* Question 3 */}
        <div className={styles.formcontrol}>
          <label>3. Mức độ hài lòng về Speakers?</label>
          <label htmlFor="speaker-1">
            <input
              type="radio"
              id="speaker-1"
              name="speaker"
              value="5"
              onChange={(e) => setSpeakerScore(e.target.value)}
            />
            Rất Tốt
          </label>
          <label htmlFor="speaker-2">
            <input
              type="radio"
              id="speaker-2"
              name="speaker"
              value="4"
              onChange={(e) => setSpeakerScore(e.target.value)}
            />
            Tốt
          </label>
          <label htmlFor="speaker-3">
            <input
              type="radio"
              id="speaker-3"
              name="speaker"
              value="3"
              onChange={(e) => setSpeakerScore(e.target.value)}
            />
            Bình Thường
          </label>
          <label htmlFor="speaker-4">
            <input
              type="radio"
              id="speaker-4"
              name="speaker"
              value="2"
              onChange={(e) => setSpeakerScore(e.target.value)}
            />
            Không Tốt
          </label>
          <label htmlFor="speaker-5">
            <input
              type="radio"
              id="speaker-5"
              name="speaker"
              value="1"
              onChange={(e) => setSpeakerScore(e.target.value)}
            />
            Rất Không Tốt
          </label>
        </div>
        {/* Question 4 */}
        <div className={styles.formcontrol}>
          <label htmlFor="comment">
            4. Bạn Thích Nhất Chương Trình Ở Điểm Nào?
          </label>

          <textarea
            name="comment1"
            id="comment"
            placeholder="Enter your comment here"
            onChange={(e) => setMostLike(e.target.value)}
          ></textarea>
        </div>

        <div className={styles.formcontrol}>
          <label htmlFor="comment">
            5. Góp ý của bạn về chương trình nếu có?
          </label>

          <textarea
            name="comment2"
            id="comment"
            placeholder="Enter your comment here"
            onChange={(e) => setRecommendation(e.target.value)}
          ></textarea>
        </div>

        <div className={styles.btnCover}>
          <button
            type="submit"
            value="submit"
            className={styles.btn}
            onClick={formHandler}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default SurveyForm;
