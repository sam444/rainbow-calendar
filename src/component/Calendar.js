import {Component} from "rainbowui-core";
import PropTypes from 'prop-types';

export default class Calendar extends Component {
    render() {
        return (
            <div>
                <div className="page-header">
                    <div className="pull-right form-inline">
                        <div className="btn-group">
                            <button className="btn btn-primary" data-calendar-nav="prev">&lt;&lt; Prev</button>
                            <button className="btn" data-calendar-nav="today">Today</button>
                            <button className="btn btn-primary" data-calendar-nav="next">Next &gt;&gt;></button>
                        </div>
                        <div className="btn-group">
                            <button className="btn btn-warning" data-calendar-view="year">Year</button>
                            <button className="btn btn-warning active" data-calendar-view="month">Month</button>
                            <button className="btn btn-warning" data-calendar-view="week">Week</button>
                            <button className="btn btn-warning" data-calendar-view="day">Day</button>
                        </div>
                    </div>
                    <h3></h3>
                </div>
                <div id={this.componentId}></div>
            </div>
        );
    }

    componentDidMount() {
        const {eventSource} = this.props;

        const calendar = $("#" + this.componentId).calendar({
            tmpl_path: "/",
            events_source: eventSource,
            onAfterViewLoad: function(view) {
                $('.page-header h3').text(this.getTitle());
                $('.btn-group button').removeClass('active');
                $('button[data-calendar-view="' + view + '"]').addClass('active');
            },
        });

        $('.btn-group button[data-calendar-nav]').each(function() {
                let $this = $(this);
                $this.click(function() {
                calendar.navigate($this.data('calendar-nav'));
            });
        });

        $('.btn-group button[data-calendar-view]').each(function() {
            let $this = $(this);
            $this.click(function() {
                calendar.view($this.data('calendar-view'));
            });
        });
    }
};

Calendar.propTypes = {
    id: PropTypes.string,
    styleClass: PropTypes.oneOf(["default", "primary", "success", "warning", "danger", "info"]),
    eventSource: PropTypes.func
};

Calendar.defaultProps = {
    styleClass: 'default',
    eventSource: function () {
        return [];
    }
};