import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './Pagination.scss';

class Pagination extends Component {
    static propTypes = {
        changeActivePage: PropTypes.func.isRequired,
        totalPages: PropTypes.number,
        pageSize: PropTypes.number,
        page: PropTypes.number
    };

    preparePaginationButtons = (totalPages) => {
        const addButtons = (buttonsArray, start, count) => {
            const resultArray = buttonsArray.slice();
            for (let i = start; i < start + count; i++) {
                resultArray.push(
                    <button
                        key={`page-${i}`}
                        onClick={() => this.props.changeActivePage(i)}
                        className={this.props.page === i ? 'active' : ''}
                        page={i}>{i}</button>
                )
            }
            return resultArray;
        };

        if (totalPages === 0) return  <div className="PaginationPage"> </div>;

        let buttons = [];
        if (totalPages <= 5 && totalPages > 1) {
            return addButtons(buttons, 1, totalPages);
        }

        if (totalPages > 5) {
            let backButton = (<button
                key={"pagination-back"}
                className="pagination-back"
                onClick={() => this.props.changeActivePage(this.props.page - 1)}
                page={this.props.page - 1}>Назад</button>);

            let nextButton = (<button
                key={"pagination-next"}
                className={`pagination-next ${this.props.page !== totalPages ? '' : 'disable'}`}
                onClick={() => this.props.changeActivePage(this.props.page + 1)}
                page={this.props.page + 1}>Вперед</button>);

            let unknownPaginationButtonLeft = (<button disabled className="pagination-back disable"
                                                       key={`unknown-pagination-button-left`}>...</button>);

            let unknownPaginationButtonRight = (<button disabled className="pagination-next disable"
                                                        key={`unknown-pagination-button-right`}>...</button>);

            if (this.props.page !== 1) buttons.push(backButton);

            if (this.props.page < 5) {
                buttons = addButtons(buttons, 1, 5);
                buttons.push(unknownPaginationButtonRight);
                buttons = addButtons(buttons, totalPages, 1);
            }

            if (this.props.page >= 5 && this.props.page <= totalPages - 5) {
                buttons = addButtons(buttons, 1, 1);
                buttons.push(unknownPaginationButtonLeft);
                buttons = addButtons(buttons, this.props.page - 2, 5);
                buttons.push(unknownPaginationButtonRight);
                buttons = addButtons(buttons, totalPages, 1);
            }

            if (this.props.page > totalPages - 5 && this.props.page <= totalPages) {
                buttons = addButtons(buttons, 1, 1);
                buttons.push(unknownPaginationButtonLeft);
                buttons = addButtons(buttons, totalPages - 4, 5)
            }

            if (this.props.page !== totalPages) buttons.push(nextButton);
            return buttons;
        }
    };

    render() {
        return (
            <div className="PaginationPage">
                <div className="PaginationPage-buttons">
                    {this.preparePaginationButtons(this.props.totalPages)}
                </div>
            </div>
        );
    }
}

export default Pagination;
