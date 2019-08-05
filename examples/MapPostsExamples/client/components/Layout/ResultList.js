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
    state = {
        selectedPostId: null,
    };

    componentWillUnmount() {
        this.props.onSearchResultClick(null);
    }

    render() {
        const { classes, searchResults } = this.props;

        return (
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
        );
    }
}

export default withStyles(useStyles)(ResultList);
