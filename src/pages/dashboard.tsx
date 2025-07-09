import React, { useState, useEffect } from 'react';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  Grid,
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Avatar,
  Chip,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Analytics as AnalyticsIcon,
  Settings as SettingsIcon,
  People as PeopleIcon,
  Assignment as AssignmentIcon,
  Notifications as NotificationsIcon,
  TrendingUp,
  AttachMoney,
  ShoppingCart,
  Group,
} from '@mui/icons-material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import Guide from 'byte-guide';

const drawerWidth = 280;

const chartData = [
  { name: 'Jan', value: 4000, sales: 2400 },
  { name: 'Feb', value: 3000, sales: 1398 },
  { name: 'Mar', value: 2000, sales: 9800 },
  { name: 'Apr', value: 2780, sales: 3908 },
  { name: 'May', value: 1890, sales: 4800 },
  { name: 'Jun', value: 2390, sales: 3800 },
];

const eventCounts = [
  { type: 'New Users', count: 1234, color: '#1976d2', icon: <Group /> },
  { type: 'Orders', count: 567, color: '#2e7d32', icon: <ShoppingCart /> },
  { type: 'Revenue', count: 89012, color: '#ed6c02', icon: <AttachMoney /> },
  { type: 'Growth', count: 23, color: '#9c27b0', icon: <TrendingUp /> },
];

const guideSteps = [
  {
    selector: '#sidebar',
    title: 'Navigation Sidebar',
    content: 'Use this sidebar to navigate through different sections of your dashboard.',
    placement: 'right',
  },
  {
    selector: '#dashboard-cards',
    title: 'Key Metrics',
    content: 'These cards show your most important business metrics at a glance.',
    placement: 'bottom',
  },
  {
    selector: '#charts-section',
    title: 'Analytics Charts',
    content: 'View your data trends and performance metrics in these interactive charts.',
    placement: 'top',
  },
  {
    selector: '#event-counts',
    title: 'Event Counters',
    content: 'Track important events and activities happening in your system.',
    placement: 'top',
  },
];

export default function Dashboard() {
  const [showGuide, setShowGuide] = useState<boolean>(false);

  // Show guide on first visit
  useEffect(() => {

    const hasSeenGuide = localStorage.getItem('dashboard-guide-completed');
    if (!hasSeenGuide) {
      setShowGuide(true);
    }
  }, []);

  const handleGuideClose = () => {
    setShowGuide(false);
    localStorage.setItem('dashboard-guide-completed', 'true');
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Byte Guide
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        <Toolbar />
        <Box id="sidebar" sx={{ overflow: 'auto', p: 2 }}>          
          <List>
            <ListItem>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <AnalyticsIcon />
              </ListItemIcon>
              <ListItemText primary="Analytics" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="Users" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <AssignmentIcon />
              </ListItemIcon>
              <ListItemText primary="Tasks" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <NotificationsIcon />
              </ListItemIcon>
              <ListItemText primary="Notifications" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItem>
          </List>
        </Box>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        
        {/* Key Metrics Cards */}
        <Grid container spacing={3} sx={{ mb: 3 }} id="dashboard-cards">
          {eventCounts.map((event, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar sx={{ bgcolor: event.color, mr: 2 }}>
                      {event.icon}
                    </Avatar>
                    <Typography variant="h6" component="div">
                      {event.type}
                    </Typography>
                  </Box>
                  <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
                    {event.count.toLocaleString()}
                    {event.type === 'Growth' && '%'}
                    {event.type === 'Revenue' && '$'}
                  </Typography>
                  <Chip
                    label={event.type === 'Growth' ? 'vs last month' : 'Total'}
                    size="small"
                    color="primary"
                    variant="outlined"
                  />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Charts Section */}
        <Grid container spacing={3} sx={{ mb: 3 }} id="charts-section">
          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader title="Monthly Trends" />
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="value" stroke="#1976d2" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader title="Sales Performance" />
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="sales" fill="#2e7d32" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Event Counts Details */}
        <Grid container spacing={3} id="event-counts">
          <Grid item xs={12}>
            <Card>
              <CardHeader title="Event Activity" />
              <CardContent>
                <Grid container spacing={2}>
                  {eventCounts.map((event, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                      <Paper sx={{ p: 2, textAlign: 'center' }}>
                        <Avatar sx={{ bgcolor: event.color, mx: 'auto', mb: 1 }}>
                          {event.icon}
                        </Avatar>
                        <Typography variant="h6" component="div">
                          {event.count.toLocaleString()}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {event.type}
                        </Typography>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Guide Component */}
      {showGuide && (
        <Guide
          steps={guideSteps}
          localKey="dashboard-guide"
          mask={true}
          hotspot={true}
          onClose={handleGuideClose}
          nextText="Next"
          prevText="Previous"
          okText="Got it!"
          stepText={(stepIndex, stepCount) => `Step ${stepIndex + 1} of ${stepCount}`}
          modalClassName="roboto-guide-modal"
        />
      )}
    </Box>
  );
}