import React, { Component } from 'react';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { List, ListItem, ListSubheader, ListItemText } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import { Card, CardContent, CardHeader } from '@material-ui/core';

const useStyles = theme => ({
    searchResultsCard: {
        cursor: 'pointer',
    },
    resultListSubheader: {
        background: theme.palette.background.default,
    },
});

class ResultList extends Component {
    render() {
        const { classes } = this.props;

        return (
            <List style={{ width: '100%' }}>
                <ListSubheader className={classes.resultListSubheader}>
                    <Typography variant="h6" gutterBottom>
                        Results:
                    </Typography>
                    <Divider />
                </ListSubheader>
                {new Array(10).fill(0).map(item => (
                    <ListItem>
                        <ListItemText>
                            <Card className={classes.searchResultsCard} onClick={() => alert('onSearchResultClick')}>
                                <CardHeader title="Title" />
                                <CardContent>
                                    <Typography variant="body2" color="textSecondary" gutterBottom>
                                        Bla bla bla bla bla bla
                                    </Typography>
                                </CardContent>
                            </Card>
                        </ListItemText>
                    </ListItem>
                ))}
            </List>
        );
    }
}

export default withStyles(useStyles)(ResultList);
