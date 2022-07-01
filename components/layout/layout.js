import { Fragment, useContext } from 'react';
import Notification from '../../components/ui/notification';
import MainHeader from './main-header';
import NotificationContext from '../../store/notification-context';
function Layout(props) {
  const notificationCtx = useContext(NotificationContext);

  const activeNotification = notificationCtx.notification;

  return (
    <Fragment>
      <MainHeader />
      <main>{props.children}</main>
      {activeNotification && <Notification {...activeNotification} />}
    </Fragment>
  );
}

export default Layout;
