ALTER DATABASE epiz_28331512_gamerse CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

SET FOREIGN_KEY_CHECKS=0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+05:30";

CREATE TABLE `chat` (
  `id` int(11) NOT NULL,
  `message` varchar(200) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `friends` (
  `id` int(11) NOT NULL,
  `pid1` varchar(50) NOT NULL,
  `pid2` varchar(50) NOT NULL,
  `status` enum('F','P') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `player` (
  `UID` text NOT NULL,
  `userName` varchar(50) NOT NULL,
  `nickName` varchar(15) NOT NULL,
  `mail` text NOT NULL,
  `dob` date NOT NULL,
  `gender` text NOT NULL,
  `accountStatus` text NOT NULL,
  `onlineStatus` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `photoURL` varchar(60) NOT NULL DEFAULT 'https://api.multiavatar.com/7f54a7b9df6bb566c4.svg'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `snakes` (
  `username` varchar(50) NOT NULL,
  `lastgame` int(11) NOT NULL,
  `highscore` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `tictactoe` (
  `id` int(11) NOT NULL,
  `played` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


ALTER TABLE `chat`
  ADD KEY `id` (`id`);

ALTER TABLE `friends`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pid1` (`pid1`),
  ADD KEY `pid2` (`pid2`);

ALTER TABLE `player`
  ADD PRIMARY KEY (`userName`);

ALTER TABLE `snakes`
  ADD KEY `username` (`username`);

ALTER TABLE `tictactoe`
  ADD KEY `id` (`id`);


ALTER TABLE `friends`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;


ALTER TABLE `chat`
  ADD CONSTRAINT `chat_ibfk_1` FOREIGN KEY (`id`) REFERENCES `friends` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

ALTER TABLE `friends`
  ADD CONSTRAINT `friends_ibfk_1` FOREIGN KEY (`pid1`) REFERENCES `player` (`userName`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `friends_ibfk_2` FOREIGN KEY (`pid2`) REFERENCES `player` (`userName`) ON DELETE CASCADE ON UPDATE NO ACTION;

ALTER TABLE `snakes`
  ADD CONSTRAINT `snakes_ibfk_1` FOREIGN KEY (`username`) REFERENCES `player` (`userName`) ON DELETE CASCADE ON UPDATE NO ACTION;

ALTER TABLE `tictactoe`
  ADD CONSTRAINT `tictactoe_ibfk_1` FOREIGN KEY (`id`) REFERENCES `friends` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
SET FOREIGN_KEY_CHECKS=1;
COMMIT;
