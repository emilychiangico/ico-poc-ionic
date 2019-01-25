export enum PortfolioHoldingType {
	SavingAndCurrent, TimeDeposit, StructuredProduct, Stock, BondNoteCertDeposit,
	UnitTrust, LinkedDeposit, OptionAndDerivativerContract, Loan, ForwardForeignExchange
};

export class PortfolioHoldingUtil {

	static getTitle(holderType) {
		switch (holderType) {
			case PortfolioHoldingType.SavingAndCurrent:
				return "Saving & Current";
			case PortfolioHoldingType.TimeDeposit:
				return "Time Deposit";
			case PortfolioHoldingType.StructuredProduct:
				return "Structured Product";
			case PortfolioHoldingType.Stock:
				return "Stock";
			case PortfolioHoldingType.BondNoteCertDeposit:
				return "Bond, Note & Certifcate of Deposit";
			case PortfolioHoldingType.UnitTrust:
				return "Unit Trust";
			case PortfolioHoldingType.LinkedDeposit:
				return "Linked Deposit";
			case PortfolioHoldingType.OptionAndDerivativerContract:
				return "Option & Derivativer Contract";
			case PortfolioHoldingType.Loan:
				return "Loan";
			case PortfolioHoldingType.ForwardForeignExchange:
				return "Forward Foreign Exchange";
			default:
				return "";
		}
	}

}