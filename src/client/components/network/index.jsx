import React from 'react';
import { Link } from 'react-router-dom';

const NetworkComponent = ({ connectedUsers, requests, suggestions, user, csrfToken }) => {
  return (
    <main className="networkContainer">
      <div className="leftNetworkContent content">
        <div className="card">
          <h5>Manage my network</h5>
          <Link to="/connections" className="network-link">
            <div className="networkCommunity">
              <div className="networkSummary">
                <i className="fa-solid fa-user-group"></i>
                <p>Connections</p>
              </div>
              <div>{connectedUsers.length}</div>
            </div>
          </Link>
          <Link to="/contacts" className="network-link">
            <div className="networkCommunity">
              <div className="networkSummary">
                <i className="fa-regular fa-address-book"></i>
                <p>Contacts</p>
              </div>
              <div>17</div>
            </div>
          </Link>
          <Link to="/following-followers" className="network-link">
            <div className="networkCommunity">
              <div className="networkSummary">
                <i className="fa-solid fa-user"></i>
                <p>Following & Followers</p>
              </div>
              <div>72</div>
            </div>
          </Link>
          <Link to="/groups" className="network-link">
            <div className="networkCommunity">
              <div className="networkSummary">
                <i className="fa-solid fa-users"></i>
                <p>Groups</p>
              </div>
              <div>12</div>
            </div>
          </Link>
          <Link to="/events" className="network-link">
            <div className="networkCommunity">
              <div className="networkSummary">
                <i className="fa-regular fa-calendar-days"></i>
                <p>Events</p>
              </div>
              <div>5</div>
            </div>
          </Link>
          <Link to="/pages" className="network-link">
            <div className="networkCommunity">
              <div className="networkSummary">
                <i className="fa-solid fa-floppy-disk"></i>
                <p>Pages</p>
              </div>
              <div>128</div>
            </div>
          </Link>
          <Link to="/newsletters" className="network-link">
            <div className="networkCommunity">
              <div className="networkSummary">
                <i className="fa-regular fa-newspaper"></i>
                <p>Newsletters</p>
              </div>
              <div>23</div>
            </div>
          </Link>
          <Link to="/hashtags" className="network-link">
            <div className="networkCommunity">
              <div className="networkSummary">
                <i className="fa-regular fa-hashtag"></i>
                <p>Hashtags</p>
              </div>
              <div>55</div>
            </div>
          </Link>
        </div>
        {/* Include the footer component */}
        {/* Assuming the Footer component is imported like this: */}
        {/* import Footer from '../includes/Footer'; */}
        {/* <Footer /> */}
      </div>
      <div className="centerNetworkContainer content">
        <div className="card">
          <div className="networkHead">
            <p>Connection Requests</p>
          </div>
          {requests.map((request) => (
            <div className="invitation" key={request.from._id}>
              <div className="userProfile networkUserProfile">
                <div className="profileImgPost">
                  <img
                    src={request.from.data.imageUrl || "/images/avatar-default.png"}
                    alt="profileImg"
                  />
                </div>
                <div className="userInfo">
                  <h5>{request.from.data.firstname} {request.from.data.lastname}</h5>
                  <p>{request.from.data.bio}</p>
                </div>
              </div>
              <div className="networkOption">
                <form action="/api/connection/rejectRequest" method="post">
                  <input type="hidden" name="_csrf" value={csrfToken} />
                  <input style={{ display: 'none' }} name="from" value={request.from._id} />
                  <input style={{ display: 'none' }} name="to" value={`${request.to._id}`} />
                  <input style={{ display: 'none' }} name="type" value="MUTUAL" />
                  <button className="noborderButton">Ignore</button>
                </form>
                <form action="/api/connection/acceptRequest" method="post">
                  <input type="hidden" name="_csrf" value={csrfToken} />
                  <input style={{ display: 'none' }} name="from" value={request.from._id} />
                  <input style={{ display: 'none' }} name="to" value={request.to._id} />
                  <input style={{ display: 'none' }} name="type" value="MUTUAL" />
                  <button className="text-button">Accept</button>
                </form>
              </div>
            </div>
          ))}
        </div>
        <div className="card">
          <h5>Suggestions for you</h5>
          <div className="suggestedConnection">
            {suggestions.map((suggestion) => (
              <div className="card profileCard suggestedCard" key={suggestion.user}>
                <div className="cover"></div>
                <div className="profileInfo">
                  <img
                    src={suggestion.imageUrl}
                    alt="profileImg"
                    className="profileImg"
                  />
                  <strong className="userName">{suggestion.firstname} {suggestion.lastname}</strong>
                  <small className="userProfession">{suggestion.bio}</small>
                  <span>{suggestion.institute}</span>
                </div>
                <div>
                  <form action="/api/connection/create" method="post">
                    <input type="hidden" name="_csrf" value={csrfToken} />
                    <input style={{ display: 'none' }} name="from" value={user.user} />
                    <input style={{ display: 'none' }} name="to" value={suggestion.user} />
                    <input style={{ display: 'none' }} name="type" value="MUTUAL" />
                    <button className="text-button">
                      <i className="fa-solid fa-user-plus"></i> Connect
                    </button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="rightNetworkContainer content">
        <div className="card left-group">
          <div className="networkHead">
            <p>Your connections</p>
          </div>
          {connectedUsers.map((reqUser) => (
            <Link to={`/profile/${reqUser.user}`} key={reqUser.user}>
              <div className="connectSuggestion">
                <div className="connectProfile">
                  <img src={reqUser.imageUrl} alt="personImg" />
                  <div className="connectInfo">
                    <strong>{reqUser.firstname} {reqUser.lastname}</strong>
                    <small>{reqUser.bio}</small>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
};

export default NetworkComponent;
