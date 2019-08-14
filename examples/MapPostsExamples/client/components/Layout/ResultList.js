import React, { Component } from 'react';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {
    List,
    ListItem,
    ListSubheader,
    ListItemText,
    ExpansionPanel,
    ExpansionPanelSummary,
    ExpansionPanelDetails,
    ExpansionPanelActions,
} from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import { Card, CardContent, CardHeader } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = theme => ({
    searchResultsCard: {
        cursor: 'pointer',
    },
    resultListSubheader: {
        background: theme.palette.background.default,
    },
});

class ResultList extends Component {
    state = {
        selectedPostId: null,
    };

    componentWillUnmount() {
        this.props.onSearchResultClick(null);
    }

    render() {
        const { classes, searchResults } = this.props;

        return (
            <>
                <Grid item>
                    <ExpansionPanel>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>Options</ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Grid container direction="column">
                                <Grid item>Foo</Grid>
                                <Grid item>Bar</Grid>
                                <Grid item>Baz</Grid>
                            </Grid>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                </Grid>
                <Grid item>
                    <List style={{ width: '100%' }}>
                        <ListSubheader className={classes.resultListSubheader}>
                            <Typography variant="h6" gutterBottom>
                                Results:
                            </Typography>
                            <Divider />
                        </ListSubheader>
                        {searchResults.map(item => (
                            <ListItem key={item.postId}>
                                <ListItemText>
                                    <Card
                                        className={classes.searchResultsCard}
                                        raised={item.postId === this.state.selectedPostId}
                                        onClick={() => {
                                            this.setState(
                                                {
                                                    selectedPostId: item.postId,
                                                },
                                                () => this.props.onSearchResultClick(item.postId)
                                            );
                                        }}
                                    >
                                        <CardHeader title={item.title} />
                                        <CardContent>
                                            <Typography variant="body2" color="textSecondary" gutterBottom>
                                                {item.description}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </ListItemText>
                            </ListItem>
                        ))}
                    </List>
                </Grid>
            </>
        );
    }
}

export default withStyles(useStyles)(ResultList);
