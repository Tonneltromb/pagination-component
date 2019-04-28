import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './Pagination.scss';

const Pagination = (props) => {

    const preparePaginationButtons = (pagesCount) => {
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

        if (pagesCount === 0) return <div className="PaginationPage"></div>;

        let buttons = [];
        if (pagesCount <= 5 && pagesCount > 1) {
            return addButtons(buttons, 1, pagesCount);
        }

        if (pagesCount > 5) {
            let backButton = (<button
                key={"pagination-back"}
                className="pagination-back"
                onClick={() => this.props.changeActivePage(this.props.page - 1)}
                page={this.props.page - 1}>Назад</button>);

            let nextButton = (<button
                key={"pagination-next"}
                className={`pagination-next ${this.props.page !== pagesCount ? '' : 'disable'}`}
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
                buttons = addButtons(buttons, pagesCount, 1);
            }

            if (this.props.page >= 5 && this.props.page <= pagesCount - 5) {
                buttons = addButtons(buttons, 1, 1);
                buttons.push(unknownPaginationButtonLeft);
                buttons = addButtons(buttons, this.props.page - 2, 5);
                buttons.push(unknownPaginationButtonRight);
                buttons = addButtons(buttons, pagesCount, 1);
            }

            if (this.props.page > pagesCount - 5 && this.props.page <= pagesCount) {
                buttons = addButtons(buttons, 1, 1);
                buttons.push(unknownPaginationButtonLeft);
                buttons = addButtons(buttons, pagesCount - 4, 5)
            }

            if (this.props.page !== pagesCount) buttons.push(nextButton);
            return buttons;
        }
    };

    const renderPageButton = (pageNumber) => {
        return <button
            key={`page-${pageNumber}`}
            onClick={() => props.changeActivePage(pageNumber)}
            className={props.page === pageNumber ? 'active' : ''}>{pageNumber}</button>
    };

    const renderAuxiliaryButton = (props) => {
        return <button {...props}/>;
    };
    const renderButtonBack = () => {
        return props.page !== 1
            ? renderAuxiliaryButton({
                key: 'pagination-back',
                className: 'pagination-back',
                onClick: () => props.changeActivePage(props.page - 1),
                children: 'назад'
            })
            : null;
    };
    const renderButtonNext = () => {
        return props.page !== props.pagesCount
            ? renderAuxiliaryButton({
                key: 'pagination-next',
                className: 'pagination-next',
                onClick: () => props.changeActivePage(props.page + 1),
                children: 'вперед'
            })
            : null;
    };
    const renderButtonUnknownLeft = () => {
        return props.page - props.centerButtonsCount >= 1
            ? renderAuxiliaryButton({
                key: 'pagination-unknown-left',
                className: 'pagination-unknown-left',
                disabled: true,
                children: '...'
            })
            : null;
    };
    const renderButtonUnknownRight = () => {
        return renderAuxiliaryButton({
            key: 'pagination-unknown-right',
            className: 'pagination-unknown-right',
            disabled: true,
            children: '...'
        });
    };
    const renderCenterButtons = () => {
        let renderArrayLength = props.centerButtonsCount;
        let startsWith = props.page - 1;
        if (props.page < props.centerButtonsCount) {
            renderArrayLength = renderArrayLength - 1;
            startsWith = 2;
        }
        // if () {
        //     renderArrayLength = renderArrayLength - 1;
        //     startsWith =
        // }
        return Array
            .from({length: renderArrayLength}, (v, k) => k + startsWith)
            .map((numberElem) => {
                return renderPageButton(numberElem);
            });
    };

    return (
        <div className="PaginationPage">
            <div className="PaginationPage-buttons">
                {renderButtonBack()}
                {renderPageButton(1)}
                {renderButtonUnknownLeft()}
                {renderCenterButtons()}
                {renderButtonUnknownRight()}
                {renderPageButton(props.pagesCount)}
                {renderButtonNext()}
            </div>
        </div>
    );
};

Pagination.propTypes = {
    page: PropTypes.number,
    pageSize: PropTypes.number,
    pagesCount: PropTypes.number,
    buttonsCount: PropTypes.number,
    changeActivePage: PropTypes.func.isRequired,
};

export default Pagination;
