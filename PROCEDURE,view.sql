
CREATE OR REPLACE PROCEDURE ADD_PLAYER(
P_NAME VARCHAR(50),P_D DATE,P_N VARCHAR(50),P_R VARCHAR(50),
A_TEAM VARCHAR(50),S_Y INT,BP INT,SP INT,
B_R INT,B_B INT,B_I INT,B_N INT,B_F INT,B_S INT,
C_I INT,C_W INT,C_O INT,C_D INT,C_M INT,
F_R INT,F_C INT,F_S INT) LANGUAGE PLPGSQL AS $$
DECLARE
PID INT;
AID CHAR(3);
SID CHAR(3);
TID CHAR(3);
BEGIN
SELECT SEASON_ID INTO SID FROM SEASON WHERE YEAR=S_Y;
SELECT TEAM_ID INTO TID FROM TEAMS WHERE TEAM_NAME=A_TEAM AND SEASON_ID=SID;
SELECT MAX(PLAYER_ID) INTO PID FROM PLAYERS;
SELECT MAX(AUCTION_ID) INTO AID FROM AUCTION WHERE SEASON_ID=SID;
INSERT INTO PLAYERS(PLAYER_ID,PLAYER_NAME,DOB,NATIONALITY,ROLE) 
VALUES(PID+1,P_NAME,P_D,P_N,P_R);
INSERT INTO AUCTION VALUES(CONCAT('A',PID+1),PID+1,SID,BP,SP,TID);
INSERT INTO BATTING_PERFORMANCE VALUES(SID,PID+1,B_R,B_B,B_F,B_S,B_I,B_N);
INSERT INTO BOWLING_PERFORMANCE VALUES(SID,PID+1,C_W,C_O,C_D,C_M);
INSERT INTO FIELDING_PERFORMANCE VALUES(SID,PID+1,F_C,F_R,F_S);
END;
$$;


CREATE VIEW V_PERFORMANCE AS 
SELECT 
    P.PLAYER_NAME,
    A.SEASON_ID,
    A.INNINGS,
    A.NOTOUT,
    A.RUNS_SCORED,
    A.BALLS_FACED,
    A.FOURS,
    A.SIXES,
    (100.0 * A.RUNS_SCORED / A.BALLS_FACED) AS BATTING_STRIKERATE,
    (A.RUNS_SCORED / (A.INNINGS - A.NOTOUT)) AS BATTING_AVERAGE,
    B.WICKETS_TAKEN,
    B.OVERS_BOWLED,
    B.DOTS,
    B.MAIDENS,
    (6.0 * B.RUNS_GIVEN / B.OVERS_BOWLED) AS ECONOMY,
    (B.OVERS_BOWLED * 6 / B.WICKETS_TAKEN) AS BOWLING_STRIKERATE,
    (B.RUNS_GIVEN / B.WICKETS_TAKEN) AS BOWLING_AVERAGE,
    C.RUN_OUTS,
    C.CATCHES,
    C.STUMPINGS
FROM  
    BATTING_PERFORMANCE AS A  
    NATURAL JOIN BOWLING_PERFORMANCE AS B 
    NATURAL JOIN FIELDING_PERFORMANCE AS C
    INNER JOIN PLAYERS AS P ON P.PLAYER_ID = C.PLAYER_ID;`




