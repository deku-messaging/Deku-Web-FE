import React, { useState } from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  List,
  ListSubheader,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  IconButton,
  ListItemSecondaryAction,
  Badge,
  Button,
  AppBar,
  InputBase,
  Divider,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import ModeRoundedIcon from "@mui/icons-material/ModeRounded";
import { formatDistanceToNow } from "date-fns";
import CssBaseline from "@mui/material/CssBaseline";
import Chat from "./sync.svg";

const messages = [
  {
    id: 1,
    sender: "Me",
    recipient: "Will",
    message:
      "Do you have a suggestion for a good present for John on his work anniversary? I am really confused and would love your thoughts on it.",
    avatar: "",
    timestamp: "2023-02-12T09:30:00Z",
  },
  {
    id: 2,
    sender: "Me",
    recipient: "Sophia",
    message:
      "I need your help with finding a great gift for John's work anniversary. Any ideas? I'm quite unsure about what to get.",
    avatar: "",
    timestamp: "2023-03-05T14:45:00Z",
  },
  {
    id: 3,
    sender: "Me",
    recipient: "Ethan",
    message:
      "Hey there! Can you assist me in selecting a suitable present for John on his work anniversary? I'm really confused and could use some suggestions.",
    avatar: "",
    timestamp: "2023-04-18T10:20:00Z",
  },

  {
    id: 5,
    sender: "Olivia",
    recipient: "Me",
    message:
      "Could you please recommend a good gift for John on his work anniversary? I'm feeling quite indecisive and would appreciate your input.",
    avatar: "",
    timestamp: "2023-01-23T16:10:00Z",
  },

  {
    id: 6,
    sender: "Promise",
    recipient: "Me",
    message:
      "Could you please recommend a good gift for John on his work anniversary? I'm feeling quite indecisive and would appreciate your input.",
    avatar: "",
    timestamp: "2023-01-23T16:10:00Z",
  },

  {
    id: 7,
    sender: "Vanessa",
    recipient: "Me",
    message:
      "Could you please recommend a good gift for John on his work anniversary? I'm feeling quite indecisive and would appreciate your input.",
    avatar: "",
    timestamp: "2023-01-23T16:10:00Z",
  },

  {
    id: 8,
    sender: "Sophia",
    recipient: "Me",
    message: "How about a tee which says 'I'm a douche bag",
    avatar: "",
    timestamp: "2023-01-23T16:10:00Z",
  },
];

const groupThreads = (messages) => {
  const threads = {};

  for (const message of messages) {
    const sender = message.sender;
    const recipient = message.recipient;

    // Generate a unique thread ID based on the sender and recipient
    const threadId1 = `${sender}-${recipient}`;
    const threadId2 = `${recipient}-${sender}`;

    // Check if the thread already exists using both thread IDs
    if (threadId1 in threads) {
      threads[threadId1].push(message);
    } else if (threadId2 in threads) {
      threads[threadId2].push(message);
    } else {
      // If the thread doesn't exist, create a new one
      threads[threadId1] = [message];
    }
  }

  return threads;
};

const sortThreads = (threads) => {
  const sortedThreads = Object.values(threads).sort((a, b) => {
    const latestMessageA = new Date(a[a.length - 1].timestamp);
    const latestMessageB = new Date(b[b.length - 1].timestamp);
    return latestMessageB - latestMessageA;
  });
  return sortedThreads;
};

let lastLabel = "";

const getThreadLabel = (timestamp) => {
  const messageDate = new Date(timestamp);
  const currentDate = new Date();
  let label = "";

  if (
    messageDate.getDate() === currentDate.getDate() &&
    messageDate.getMonth() === currentDate.getMonth() &&
    messageDate.getFullYear() === currentDate.getFullYear()
  ) {
    label = "Today";
  } else if (
    messageDate.getDate() === currentDate.getDate() - 1 &&
    messageDate.getMonth() === currentDate.getMonth() &&
    messageDate.getFullYear() === currentDate.getFullYear()
  ) {
    label = "Yesterday";
  } else {
    label = formatDistanceToNow(messageDate, { addSuffix: true });
  }

  if (lastLabel === label) {
    return "";
  }

  lastLabel = label;
  return label;
};

export default function App() {
  const [selectedThread, setSelectedThread] = useState(null);
  const [inputMessage, setInputMessage] = useState("");

  const threads = sortThreads(groupThreads(messages));

  const handleOpenThread = (threadIndex) => {
    setSelectedThread(threadIndex);
  };

  const handleSendMessage = () => {
    messages.push({
      id: messages.length + 1,
      sender: "Me",
      recipient:
        messages[selectedThread].recipient === "Me"
          ? messages[selectedThread].sender
          : messages[selectedThread].recipient,
      message: inputMessage,
      avatar: "",
      timestamp: new Date(),
    });
    console.log("Sending message:", inputMessage);
    setInputMessage("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {/* Threads */}
          <Grid item xs={3} style={{ maxHeight: "100vh", overflow: "auto" }}>
            <React.Fragment>
              <CssBaseline />
              <Box
                bgcolor="background.paper"
                position="sticky"
                sx={{
                  top: 0,
                  zIndex: 1,
                }}
              >
                <Typography
                  variant="h5"
                  position="sticky"
                  gutterBottom
                  component="nav"
                  sx={{
                    p: 2,
                    pb: 0,
                    top: 0,
                    zIndex: 1,
                  }}
                >
                  Messages
                  <Box sx={{ pt: 2 }}>
                    <Button variant="contained" startIcon={<ModeRoundedIcon />}>
                      Start Chat
                    </Button>
                  </Box>
                </Typography>
              </Box>
              <Paper square sx={{ pb: "50px" }} position="fixed">
                <List sx={{ mb: 2 }}>
                  {threads.map((thread, index) => {
                    const [firstMessage] = thread;
                    const label = getThreadLabel(firstMessage.timestamp);
                    const badgeContent = thread.length;
                    return (
                      <React.Fragment key={index}>
                        <ListSubheader sx={{ bgcolor: "background.paper" }}>
                          {label}
                        </ListSubheader>{" "}
                        <ListItem
                          button
                          onClick={() => handleOpenThread(index)}
                          sx={{
                            bgcolor: selectedThread === index ? "#1565C0" : "",
                          }}
                        >
                          <ListItemAvatar>
                            <Avatar
                              alt={
                                firstMessage.recipient === "Me"
                                  ? firstMessage.sender[0].toUpperCase()
                                  : firstMessage.recipient[0].toUpperCase()
                              }
                              src={
                                firstMessage.recipient === "Me"
                                  ? firstMessage.sender[0].toUpperCase()
                                  : firstMessage.recipient[0].toUpperCase()
                              }
                              sx={{
                                bgcolor: () => {
                                  const colors = [
                                    // "#EE2677", // pink
                                    "#C8553D",
                                    "#FF8200",
                                    "#CC59D2",
                                    "#FDE12D",
                                    "#F487B6",
                                    "#CB807D",
                                    "#276FBF",
                                    "#20A39E",
                                  ];

                                  const index =
                                    firstMessage.recipient === "Me"
                                      ? firstMessage.sender[0].charCodeAt(0) %
                                        colors.length
                                      : firstMessage.recipient[0].charCodeAt(
                                          0
                                        ) % colors.length;
                                  return colors[index];
                                },
                                color: "white",
                              }}
                            />
                          </ListItemAvatar>
                          <ListItemText
                            primary={
                              firstMessage.recipient === "Me"
                                ? firstMessage.sender
                                : firstMessage.recipient
                            }
                            secondary={
                              <Box
                                sx={{
                                  display: "flex",
                                  flexDirection: "column",
                                }}
                              >
                                <span>
                                  {firstMessage.message.length > 50
                                    ? `${firstMessage.message.slice(0, 50)}...`
                                    : firstMessage.message}
                                </span>
                                <span
                                  style={{
                                    paddingTop: "8px",
                                    color: "#999",
                                    fontSize: "0.59rem",
                                  }}
                                >
                                  {label.toLowerCase() === "today"
                                    ? formatDistanceToNow(
                                        new Date(firstMessage.timestamp),
                                        {
                                          addSuffix: true,
                                        }
                                      )
                                    : new Date(
                                        firstMessage.timestamp
                                      ).toLocaleString()}
                                </span>
                              </Box>
                            }
                            primaryTypographyProps={{
                              variant: "subtitle1",
                            }}
                            secondaryTypographyProps={{
                              variant: "body2",
                            }}
                          />
                          <ListItemSecondaryAction>
                            <Badge
                              badgeContent={badgeContent}
                              color="primary"
                            />
                          </ListItemSecondaryAction>
                        </ListItem>
                      </React.Fragment>
                    );
                  })}
                </List>
              </Paper>
            </React.Fragment>
          </Grid>
          {/* Chats */}
          <Grid
            item
            xs={9}
            fullWidth
            alignItems="center"
            style={{ maxHeight: "100vh", width: "100%", overflow: "auto" }}
          >
            {selectedThread !== null ? (
              // Render open thread view
              <Box>
                <AppBar
                  position="sticky"
                  sx={{
                    p: 1,
                    pb: 0,
                    top: 0,
                  }}
                >
                  {threads[selectedThread][0].recipient === "Me"
                    ? threads[selectedThread][0].sender
                    : threads[selectedThread][0].recipient}
                </AppBar>

                <Box>
                  {threads[selectedThread].map((message, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems:
                          message.sender === "Me" ? "flex-end" : "flex-start",
                        py: 1,
                        px: 2,
                        mt: 2,
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection:
                            message.sender === "Me" ? "row-reverse" : "row",
                        }}
                      >
                        <ListItemAvatar>
                          <Avatar
                            alt={message.sender[0].toUpperCase()}
                            src={message.sender[0].toUpperCase()}
                            sx={{
                              bgcolor: () => {
                                const colors = [
                                  "#C8553D",
                                  "#FF8200",
                                  "#CC59D2",
                                  "#FDE12D",
                                  "#F487B6",
                                  "#CB807D",
                                  "#276FBF",
                                  "#20A39E",
                                ];

                                const index =
                                  message.sender[0].charCodeAt(0) %
                                  colors.length;
                                return colors[index];
                              },
                              color: "white",
                              mx: 2,
                            }}
                          />
                        </ListItemAvatar>
                        <Paper
                          sx={{
                            p: 2,
                            bgcolor:
                              message.sender === "Me" ? "#F4F2F3" : "#2979ff",
                            color: "#000000",
                            borderRadius: "10px",
                            width: "50%",
                          }}
                        >
                          {message.message}
                        </Paper>
                      </Box>

                      <Typography
                        variant="body2"
                        color="textSecondary"
                        sx={{
                          alignSelf:
                            message.sender === "Me" ? "flex-end" : "flex-start",
                          mt: 1,
                          mx: 10,
                        }}
                      >
                        {new Date(message.timestamp).toLocaleString()}
                      </Typography>
                    </Box>
                  ))}
                </Box>

                <Grid
                  sx={{
                    position: "fixed",
                    bottom: 0,
                    width: "100%",
                    bgcolor: "background.paper",
                  }}
                >
                  {/* Send Message Input */}
                  <Paper
                    component="form"
                    sx={{
                      p: "2px 4px",
                      display: "flex",
                      alignItems: "center",
                      boxShadow: 24,
                      width: "70%",
                      marginBottom: 5,
                    }}
                  >
                    <InputBase
                      size="small"
                      variant="filled"
                      placeholder="Type your message..."
                      fullWidth
                      multiline
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyDown={handleKeyDown}
                    />
                    <Divider
                      sx={{ height: 28, m: 0.5 }}
                      orientation="vertical"
                    />
                    <IconButton
                      type="button"
                      aria-label="send message"
                      onClick={handleSendMessage}
                    >
                      <SendIcon />
                    </IconButton>
                  </Paper>
                </Grid>
              </Box>
            ) : (
              // Render no thread selected view
              <Box
                sx={{
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <img src={Chat} alt="Chat svg" width={200} />
                <Typography
                  variant="h6"
                  color="textSecondary"
                  paddingTop="15px"
                >
                  Keep your phone online
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Your phone is paired so you can use this device to stay
                  connected
                </Typography>
              </Box>
            )}
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
