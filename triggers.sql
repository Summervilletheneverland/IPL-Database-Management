//trigger for calculation of age of player from DOB
CREATE OR REPLACE TRIGGER trigger_age
    AFTER INSERT
    ON public.players
    FOR EACH ROW
    EXECUTE FUNCTION public.function_age();
    
CREATE OR REPLACE FUNCTION public.function_age()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF
AS $BODY$
 BEGIN
UPDATE PLAYERS SET AGE=DATE_PART('YEAR',AGE(CURRENT_DATE,NEW.DOB)) WHERE PLAYER_ID=NEW.PLAYER_ID; 
RETURN NEW;
END;
$BODY$;


//function for whether to retain or NOT
CREATE OR REPLACE FUNCTION check_retention(player_id INT, season_id CHAR(3)) RETURNS BOOLEAN AS $$
DECLARE
    player_role varchar(20);
    team_id char(3);
    total_runs INT;
    batting_str REAL;
    total_wickets INT;
    bowling_str REAL;
BEGIN
    SELECT p.role, t.team_id INTO player_role, team_id 
    FROM players p
    INNER JOIN team t ON p.team_id = t.team_id AND t.season_id = season_id
    WHERE p.player_id = player_id;
    IF player_role = 'batsman' or 'wicketkeeper' THEN
        SELECT runs_scored,runs_scored/balls_faced INTO total_runs, batting_str
        FROM batting_performance 
        WHERE player_id = player_id;       
        RETURN total_runs > 300 AND batting_avg > 130;
    ELSIF player_role = 'bowler' THEN
        SELECT wickets_taken, wickets_taken/overs_bowled INTO total_wickets, bowling_str 
        FROM bowling_performance 
        WHERE player_id = player_id;    
        RETURN total_wickets > 15 AND bowling_avg < 16;
    ELSIF player_role = 'all-rounder' THEN 
        SELECT runs_scored, wickets_taken INTO total_runs, total_wickets 
        FROM batting_performance NATURAL JOIN bowling_performance
        WHERE player_id = player_id;
        RETURN total_runs > 250 AND total_wickets > 10;
    ELSE
        RAISE EXCEPTION 'Invalid player role';
    END IF;
END;
$$ LANGUAGE plpgsql;


//function for calculating batting strikreate
CREATE OR REPLACE FUNCTION calculate_strike_rate(player_id INT, season_id CHAR(3))
RETURNS REAL AS $$
DECLARE
    total_runs INT;
    total_balls INT;
    strike_rate REAL;
BEGIN
    SELECT SUM(RUNS_SCORED), SUM(BALLS_FACED) INTO total_runs, total_balls
    FROM BATTING_PERFORMANCE
    WHERE PLAYER_ID = player_id AND SEASON_ID = season_id;

    IF total_balls = 0 THEN
        strike_rate := 0.0;
    ELSE
        strike_rate := (total_runs / total_balls) * 100;
    END IF;

    RETURN strike_rate;
END;
$$ LANGUAGE PLPGSQL;

//function for calculating bowling strike_rate
CREATE OR REPLACE FUNCTION calculate_bowling_strike_rate(player_id INT, season_id CHAR(3))
RETURNS REAL AS $$
DECLARE
    total_wickets INT;
    total_overs INT;
    bowling_strike_rate REAL;
BEGIN
    SELECT SUM(WICKETS_TAKEN), SUM(OVERS_BOWLED) INTO total_wickets, total_overs
    FROM BOWLING_PERFORMANCE
    WHERE PLAYER_ID = player_id AND SEASON_ID = season_id;
    IF total_overs = 0 THEN
        bowling_strike_rate := 0.0;
    ELSE
        bowling_strike_rate := (total_wickets / total_overs) * 10;
    END IF;

    RETURN bowling_strike_rate;
END;
$$ LANGUAGE PLPGSQL;

//trigger function for deletion of player
CREATE OR REPLACE FUNCTION delete_player_occurrences()
RETURNS TRIGGER AS $$
BEGIN
    DELETE FROM AUCTION WHERE PLAYER_ID = OLD.PLAYER_ID;
    DELETE FROM BATTING_PERFORMANCE WHERE PLAYER_ID = OLD.PLAYER_ID;
    DELETE FROM BOWLING_PERFORMANCE WHERE PLAYER_ID = OLD.PLAYER_ID;    
    DELETE FROM FIELDING_PERFORMANCE WHERE PLAYER_ID = OLD.PLAYER_ID;
    RETURN OLD;
END;
$$ LANGUAGE PLPGSQL;
CREATE TRIGGER delete_player_trigger
AFTER DELETE ON PLAYERS
FOR EACH ROW
EXECUTE FUNCTION delete_player_occurrences();


