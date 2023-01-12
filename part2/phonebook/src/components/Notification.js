const Notification = ({notification}) => {
  console.log("Notification ", notification);
  return (
    <div className={`notification ${notification.error ? 'error' : 'success'}`}>
      {notification.message}
    </div>
  );
};

export default Notification;